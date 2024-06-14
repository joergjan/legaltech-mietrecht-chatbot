<script lang="ts">
  import type { PageData } from "./$types.js";
  import ProvideUsername from "./provide-username.svelte";
  import AskQuestion from "./ask-questions.svelte";
  import { superForm } from "sveltekit-superforms";
  export let data: PageData;
  import Chatbox from "$lib/components/chat/Chatbox.svelte";

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

  {#if $uDelayed || $qDelayed}
    <div class="loader"></div>
  {/if}

  {#if $qMessage || $uMessage}
    <div class="border rounded-lg border-white">
      {#if $qMessage}
        <Chatbox history={$qMessage} />
      {:else}
        <Chatbox history={$uMessage} />
      {/if}

      <div
        class="md:p-5 md:block fixed bottom-0 left-0 right-0 p-5 bg-black bg-opacity-80 backdrop-blur-sm"
      >
        <div class="">
          <AskQuestion data={data.askQuestion} />
          <form action="?/restartChat">
            <button class="px-3 py-2 rounded-md bg-red-500">neu starten</button>
          </form>
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loader {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }
</style>
