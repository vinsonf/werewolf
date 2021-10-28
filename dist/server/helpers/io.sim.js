import { CardModel } from "../schemas/card.schema.js";
import { PositionModel } from "../schemas/position.schema.js";
import { GameModel } from "../schemas/game.schema.js";
import { PlayerModel } from "../schemas/player.schema.js";
export function onConnection(socketId) {
    const player = new PlayerModel({
        socketId: socketId,
    });
    return player.save();
}
export async function onAddName(socketId, playerName, pin) {
    const player = await PlayerModel.findOneAndUpdate({ socketId }, { $set: { playerName } });
    return GameModel.findOneAndUpdate({ pin: pin }, { $push: { players: player?._id } }, { new: true });
}
export async function onAddGame(pin) {
    const game = await new GameModel({ pin });
    return game.save();
}
function createPostion(cardId, postion) {
    return new PositionModel({
        card: cardId,
        postion,
    }).save();
}
export async function addRandomCards(pin) {
    const cards = await CardModel.find({});
    const players = await PlayerModel.find({});
    let randomCards = cards.sort(() => Math.random() - 0.5).map(card => card._id);
    randomCards = randomCards.slice(0, players.length + 3);
    const nonPlayerCards = randomCards.slice(players.length);
    const leftPosition = await createPostion(nonPlayerCards[0], 'left');
    const centerPosition = await createPostion(nonPlayerCards[1], 'center');
    const rightPosition = await createPostion(nonPlayerCards[2], 'right');
    console.log(leftPosition, centerPosition, rightPosition);
    return GameModel.findOneAndUpdate({ pin: pin }, { $push: { cards: randomCards } }, { new: true });
}
export function getGameState(pin) {
    return GameModel.findOne({ pin: pin }).populate([{
            path: 'players',
            populate: {
                path: 'card'
            }
        }, { path: 'cards' }]);
}
export async function passOutCards(pin) {
    const game = await GameModel.findOne({ pin }).populate('players');
    game.players.forEach((player, index) => {
        player.card = game.cards[index];
        player.save();
    });
}
export async function findPlayerByCardTitle(title) {
    let cards = await CardModel.find({ title });
    console.log(cards);
    cards = cards.map(card => card._id);
    return PlayerModel.find({ card: { $in: cards } }).populate({ path: 'card' });
}
export async function findNotUsedCards(pin) {
    const game = await getGameState(pin);
    const playersCards = game.players.map((player) => player.card._id.toString());
    return game.cards.filter((card) => {
        const cardId = card._id.toString();
        return !playersCards.includes(cardId);
    });
}
//# sourceMappingURL=io.sim.js.map