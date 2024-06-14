<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { provideUsername, type FormSchema } from "./schema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  export let data: SuperValidated<Infer<typeof provideUsername>>;

  const form = superForm(data, {
    validators: zodClient(provideUsername),
  });

  const { form: formData, enhance, delayed } = form;
</script>

<form
  method="POST"
  action="?/provideUsername"
  class="w-full max-w-3xl"
  use:enhance
>
  <Form.Field {form} name="username">
    <Form.Control let:attrs>
      <div class="flex items-center justify-center">
        <Form.Label>Wie heisst du?</Form.Label>
      </div>
      <Input {...attrs} class="text-center" bind:value={$formData.username} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <div class="flex items-center justify-center">
    <Form.Button>Speichern</Form.Button>
  </div>
  {#if $delayed}
    <div class="loader"></div>
  {/if}
</form>

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
