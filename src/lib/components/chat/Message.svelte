<script lang="ts">
  export let message: string;
  import markdownParser from "$lib/markdown";
  export let role: "model" | "user";

  function updateMessage() {
    const el = document.createElement("div");
    el.textContent = message;
    markdownParser().update(el);
    message = el.innerHTML;
  }

  updateMessage();
</script>

<div
  class="flex {role === 'model'
    ? 'justify-start md:mr-32'
    : 'justify-end md:ml-32'}"
>
  {#if role === "model"}
    <div class="flex items-center justify-center md:mr-5 mr-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30px"
        viewBox="0 -960 960 960"
        width="30px"
        fill="#e8eaed"
        ><path
          d="M160-120v-200q0-33 23.5-56.5T240-400h480q33 0 56.5 23.5T800-320v200H160Zm200-320q-83 0-141.5-58.5T160-640q0-83 58.5-141.5T360-840h240q83 0 141.5 58.5T800-640q0 83-58.5 141.5T600-440H360ZM240-200h480v-120H240v120Zm120-320h240q50 0 85-35t35-85q0-50-35-85t-85-35H360q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0-80q17 0 28.5-11.5T400-640q0-17-11.5-28.5T360-680q-17 0-28.5 11.5T320-640q0 17 11.5 28.5T360-600Zm240 0q17 0 28.5-11.5T640-640q0-17-11.5-28.5T600-680q-17 0-28.5 11.5T560-640q0 17 11.5 28.5T600-600ZM480-200Zm0-440Z"
        /></svg
      >
    </div>
  {/if}
  <li class="my-3 rounded-md border border-gray-100 flex">
    <p class="p-2">{@html message}</p>
  </li>
  {#if role === "user"}
    <div class="flex items-center justify-center md:ml-5 ml-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30px"
        viewBox="0 -960 960 960"
        width="30px"
        fill="#e8eaed"
        ><path
          d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
        /></svg
      >
    </div>
  {/if}
</div>
