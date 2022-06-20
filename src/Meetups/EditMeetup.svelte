<script>
    import meetups from './meetups-store';
    import {createEventDispatcher} from 'svelte';
    import TextInput from "../UI/TextInput.svelte";
    import Button from '../UI/Button.svelte';
    import Modal from '../UI/Modal.svelte';
    import {isNotEmpty, isValidEmail} from '../helpers/validation';

    export let id = null;

    let title = '';
    let subtitle = '';
    let address = '';
    let email = '';
    let description = '';
    let imageUrl = '';
    
    if (id) {
        const unsubscribe = meetups.subscribe(items => {
            const selectedMeetup = items.find(i => i.id === id);
            title = selectedMeetup.title;
            subtitle = selectedMeetup.subtitle;
            address = selectedMeetup.address;
            email = selectedMeetup.contactEmail;
            description = selectedMeetup.description
            imageUrl = selectedMeetup.imageUrl;
        });
        unsubscribe();
    }
    
    let loadedMeetups = meetups;
    const dispatch = createEventDispatcher();

    $: titleValid = !isNotEmpty(title);
    $: subtitleValid = !isNotEmpty(subtitle);
    $: addressValid = !isNotEmpty(address);
    $: imageValid = !isNotEmpty(imageUrl);
    $: emailValid = isValidEmail(email);
    $: descValid = !isNotEmpty(description);
    $: formIsValid = 
        titleValid && 
        subtitleValid && 
        addressValid && 
        emailValid && 
        imageValid && 
        descValid;

    function submitForm() {
        const meetupData = {
            title: title,
            subtitle: subtitle,
            description: description,
            imageUrl: imageUrl,
            address: address,
            contactEmail: email
        };
        if (id) {
            loadedMeetups.updateMeetup(id, meetupData);
        } else {
            loadedMeetups.addMeetup(meetupData);            
        }
        dispatch('save');
    }

    function deleteMeetup() {
        meetups.removeMeetup(id);
        dispatch("save");
    }
    function cancel() {
        dispatch('cancel');
    }
</script>

<style>
    form {
        width: 100%;
        /* max-width: 90%;
        margin: auto; */
    }
</style>
<Modal title='Edit Meetup Data' on:cancel>
    <form on:submit|preventDefault="{submitForm}">
        <TextInput 
            id='title' 
            label='Title'
            valid={titleValid}
            validityMessage="Please enter a valid title."
            value={title} 
            type='text'
            on:input={event => (title = event.target.value)}/>
        <TextInput 
            id='subtitle' 
            label='Subtitle'
            valid={subtitleValid}
            validityMessage="Please enter a valid subtitle." 
            value={subtitle} 
            type='text'
            on:input={event => (subtitle = event.target.value)}/>        
        <TextInput 
            id='address' 
            label='Address'
            valid={addressValid}
            validityMessage="Please enter a valid address." 
            value={address} 
            type='text'
            on:input={event => (address = event.target.value)}/>
        <TextInput 
            id='imageUrl' 
            label='ImageUrl'
            valid={imageValid}
            validityMessage="Please enter a valid image url." 
            value={imageUrl} 
            type='text'
            on:input={event => (imageUrl = event.target.value)}/>
        <TextInput 
            id='email' 
            label='Email'
            valid={emailValid}
            validityMessage="Please enter a valid email." 
            value={email} 
            type='text'
            on:input={event => (email = event.target.value)}/>
        <TextInput 
            id='description' 
            label='Description'
            valid={descValid}
            validityMessage="Please enter a valid description." 
            value={description}
            controlType='textarea' 
            on:input={event => (description = event.target.value)}/>

    </form>
    <div slot='footer'>
        <Button type='button' mode='outline' on:click="{cancel}">Cancel</Button>
        <Button type='button' disabled={!formIsValid} on:click="{submitForm}">Save</Button>
        {#if id}
        <Button type='button' on:click={deleteMeetup}>Delete</Button>
        {/if}
    </div>
</Modal>