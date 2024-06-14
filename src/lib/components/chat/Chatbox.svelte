<script>
  import Message from "./Message.svelte";
  export let history;

  console.log(history);
</script>

<div class="flex flex-col py-1 px-3 space-y-2">
  <ul class="w-full">
    {#each history as message}
      <Message message={message.text} role={message.role} />
    {/each}
  </ul>
</div>
