<template>
    <div class="library">
        <h1 class="library__app-name u-user-select-none">Appunti</h1>
        <div class="library__folders"></div>
        <button @click="handleNewNote" class="library__new-note">
            New note
        </button>
    </div>
</template>

<script setup>
function handleNewNote() {
    console.log('new note')
}
</script>

<style scoped>
.library {
    display: flex;
    flex-direction: column;
    min-width: 30rem;
    background-color: var(--color-background-accent);
    padding: var(--spacing-large);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-right: solid 1px var(--color-border);
}

.library__app-name {
    margin-top: 0;
    font-weight: 700;
    color: var(--color-accent);
}

.library__folders {
    flex: 1;
}

.library__new-note {
    width: 100%;
}
</style>