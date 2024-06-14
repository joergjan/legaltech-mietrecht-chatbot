<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { provideUsername, type FormSchema } from "./schema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import Sparkles from "$lib/components/Sparkles.svelte";
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
      <div class="relative">
        <Input {...attrs} class="text-center" bind:value={$formData.username} />
        {#if $delayed}
          <div
            class="absolute top-0 bottom-0 left-0 flex items-center justify-center p-1"
          >
            <Sparkles />
          </div>
        {/if}
      </div>
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <div class="flex items-center justify-center">
    <Form.Button>Speichern</Form.Button>
  </div>
</form>
