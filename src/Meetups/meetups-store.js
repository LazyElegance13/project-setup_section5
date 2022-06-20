import {writable} from 'svelte/store';

const meetups = writable([
    {
        id: 'm1',
        title: 'Coding Bootcamp',
        subtitle: 'Learn to code in 2 hours',
        description: 'In this meetup, we will have some experts that teach you how to code',
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.wSpWJQx9RlrZPbULL0OqnAHaJ3%26pid%3DApi&f=1',
        address: '27th Nerd Road. 4324423 New York',
        contactEmail: 'code@test.com',
        isFavorite: false
    },
    {
        id: 'm2',
        title: 'Swim Together',
        subtitle: 'Let\'s go for a swim',
        description: 'We will simple swim some rounds',
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.dSzRmdJneez9VkWadwrPAgHaIu%26pid%3DApi&f=1',
        address: '27th Nerd Road. 4324423 New York',
        contactEmail: 'swim@test.com',
        isFavorite: false
    }

]);

const customMeetupStore = {
    subscribe: meetups.subscribe,
    addMeetup: meetupData => {
        const newMeetup = {
            ...meetupData,
            id: Math.random().toString(),
            isFavorite: false
        };
        meetups.update(items => {
            return [newMeetup, ...items];
        });

    },
    updateMeetup: (id, meetupData) => {
        meetups.update(items => {
            const meetupIndex = items.findIndex(i => i.id === id);
            const updatedMeetup = {...items[meetupIndex], ...meetupData};
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        });
    },
    removeMeetup: id => {
        meetups.update(items => {
            return items.filter(i => i.id !== id);
        });
    },
    toggleFavorite: id => {
        meetups.update(items => {
            const updatedMeetup = {...items.find(m => m.id === id)};
            updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
            const meetupIndex = items.findIndex(m => m.id === id);
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        });
    },
}

export default customMeetupStore;