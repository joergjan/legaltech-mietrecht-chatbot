<script lang="ts">
  import { afterUpdate } from "svelte";
  import type { PageData } from "./$types.js";
  import ProvideUsername from "./provide-username.svelte";
  import AskQuestion from "./ask-questions.svelte";
  import { superForm } from "sveltekit-superforms";
  export let data: PageData;
  import Chatbox from "$lib/components/chat/Chatbox.svelte";

  let chatContainer: HTMLElement;

  const {
    delayed: uDelayed,
    enhance: uEnhance,
    form: uForm,
    message: uMessage,
  } = superForm(data.provideUsername, {
    resetForm: true,
    multipleSubmits: "prevent",
  });

  const {
    delayed: qDelayed,
    enhance: qEnhance,
    form: qForm,
    message: qMessage,
  } = superForm(data.askQuestion, {
    resetForm: true,
    multipleSubmits: "prevent",
  });

  afterUpdate(() => {
    if (chatContainer) {
      chatContainer.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  });
</script>

<main class="p-5 mb-48">
  <div class="flex items-center justify-center">
    <h1>Mietrecht Chatbot</h1>
  </div>
  <br />
  <br />

  <div class="flex items-center justify-center">
    {#if !$uMessage && !$qMessage}
      <ProvideUsername data={data.provideUsername} />
    {/if}
  </div>

  {#if $qMessage || $uMessage}
    <div bind:this={chatContainer}>
      {#if $qMessage}
        <Chatbox history={$qMessage} />
      {:else}
        <Chatbox history={$uMessage} />
      {/if}

      <div
        class="md:p-5 md:block md:relative fixed bottom-0 left-0 right-0 p-5 md:bg-transparent md:backdrop-blur-none bg-black bg-opacity-80 backdrop-blur-sm"
      >
        <AskQuestion data={data.askQuestion} />
      </div>
    </div>
  {/if}
</main>
