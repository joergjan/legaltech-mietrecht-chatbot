<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { askQuestion, type FormSchema } from "./schema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
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
      <Input {...attrs} bind:value={$formData.question} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Mietrecht Chatbot fragen</Form.Button>
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
