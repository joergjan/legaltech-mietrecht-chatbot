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
      <Form.Label>Wie heisst du?</Form.Label>

      <div class="relative">
        <Input {...attrs} bind:value={$formData.username} animate={$delayed} />
      </div>
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button>Speichern</Form.Button>
</form>
