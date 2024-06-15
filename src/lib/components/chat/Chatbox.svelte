<script>
  import Message from "./Message.svelte";
  export let history;

  console.log(history);

  let examples = [
    {
      text: "Wofür ist die Mietkaution?",
      role: "user",
    },
    {
      text: "Wann darf der Mietzins erhöht werden?",
      role: "user",
    },
    {
      text: "Was ist eine ausserordentliche Kündigung?",
      role: "user",
    },
  ];
</script>

<div class="flex flex-col py-1 px-3 space-y-2">
  <ul class="w-full">
    {#each history as message, i}
      {#if i === 0}
        <Message message={message.text} role={message.role} />
      {/if}
    {/each}
    <p class="text-end md:mr-12 mr-10 text-gray-400">Beispielfragen</p>
    {#each examples as message}
      <Message message={message.text} role={message.role} example={true} />
    {/each}
    {#each history as message, i}
      {#if i > 0}
        <Message message={message.text} role={message.role} />
      {/if}
    {/each}
  </ul>
</div>
