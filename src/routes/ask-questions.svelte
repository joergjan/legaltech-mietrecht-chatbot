<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { askQuestion, type FormSchema } from "./schema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import Sparkles from "$lib/components/Sparkles.svelte";
  import { zodClient } from "sveltekit-superforms/adapters";

  export let data: SuperValidated<Infer<typeof askQuestion>>;

  const form = superForm(data, {
    validators: zodClient(askQuestion),
  });

  const { form: formData, enhance, delayed } = form;
</script>

<form method="POST" use:enhance action="?/askQuestion">
  <Form.Field {form} name="question">
    <Form.Control let:attrs>
      <Form.Label>Was möchtest du wissen?</Form.Label>
      <div class="relative">
        <Input {...attrs} bind:value={$formData.question} disabled={$delayed} />
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
  <Form.Button>Mietrecht Chatbot fragen</Form.Button>
</form>
