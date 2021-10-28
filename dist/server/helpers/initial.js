import { CardModel } from "../schemas/card.schema.js";
export function setupCardsInitial() {
    CardModel.insertMany([{
            title: "Werewolf",
            description: "You are a werewolf. You can kill other players.",
        }, {
            title: "Werewolf",
            description: "You are a werewolf. You can kill other players.",
        }, {
            title: "Werewolf",
            description: "You are a werewolf. You can kill other players.",
        }, {
            title: "Villager",
            description: "You are a villager. You can't kill other players.",
        }, {
            title: "Villager",
            description: "You are a villager. You can't kill other players.",
        }, {
            title: "Seer",
            description: "You are a seer. You can see the identity of other players.",
        }, {
            title: "Robber",
            description: "You are a robber. You can steal the identity of other players.",
        },
        {
            title: "Troublemaker",
            description: "You are a troublemaker. You can exchange the identity of other players.",
        }
    ]);
}
//# sourceMappingURL=initial.js.map