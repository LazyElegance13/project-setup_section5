<script>
    import Header from "./UI/Header.svelte";
    import MeetupGrid from "./Meetups/MeetupGrid.svelte";
    import TextInput from "./UI/TextInput.svelte";
    import Button from './UI/Button.svelte';
    import EditMeetup from './Meetups/EditMeetup.svelte';

    let meetups = [
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

    ]

    let editMode;

    function addMeetup(event) {
       const newMeetup = {
            id: Math.random().toString(),
            title: event.detail.title,
            subtitle: event.detail.subtitle,
            description: event.detail.description,
            imageUrl: event.detail.imageUrl,
            address: event.detail.address,
            contactEmail: event.detail.email
        };
        meetups = [newMeetup, ...meetups];
        editMode = null;
    }

    function toggleFavorite(event) {
        const id = event.detail;
        const updatedMeetup = {...meetups.find(m => m.id === id)};
        updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
        const meetupIndex = meetups.findIndex(m => m.id === id);
        const updatedMeetups = [...meetups];
        updatedMeetups[meetupIndex] = updatedMeetup;
        meetups = updatedMeetups;
    }

    function cancelEdit() {
        editMode = null;
    }
</script>
<style>
    main {
        margin-top: 5rem;
    }
    .meetup-controls {
        margin: 1rem;
    }
</style>

<Header />

<main>
    <div class='meetup-controls'>
        <Button on:click={() => editMode = 'add'} > New Meetup</Button>
    </div>
    {#if (editMode === 'add') }
    <EditMeetup on:save="{addMeetup}"  on:cancel="{cancelEdit}"/>
    {/if}
    <MeetupGrid meetups={meetups} on:togglefavorite="{toggleFavorite}"/>
</main>
