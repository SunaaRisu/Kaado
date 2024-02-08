import { defineStore } from "pinia";

export const useDecksStore = defineStore('decks', {
    state: () => {
        return {
            decks: [],
            decks_ids: []
        }
    },
    actions: {
        setNewStackSession(id, deckSettings) {
            if (!this.decks_ids.includes(id)) {
                this.decks.push({
                    id: id,
                    deckSettings: deckSettings
                });
                this.decks_ids.push(id);
            } else {
                this.decks[this.decks_ids.indexOf(id)].deckSettings = deckSettings;
            }
        },
        async getStackSessionById(id) {
            if (!this.decks_ids.includes(id)) {
                return false;
            } else {
                return this.decks[this.decks_ids.indexOf(id)];
            }
        }
    }
})