<script>
  import { onMount } from "svelte";
</script>

<div
  class="flex items-center justify-center bg-black rounded bg-opacity-80 p-1"
>
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 64 64"
    class="fill-white h-6 w-6 sparkle"
  >
    <path
      class="blink"
      d="M22.625 2c0 15.834-8.557 30-20.625 30c12.068 0 20.625 14.167 20.625 30c0-15.833 8.557-30 20.625-30c-12.068 0-20.625-14.166-20.625-30"
    >
    </path>
    <path
      class="blink"
      d="M47 32c0 7.918-4.277 15-10.313 15C42.723 47 47 54.084 47 62c0-7.916 4.277-15 10.313-15C51.277 47 47 39.918 47 32z"
    >
    </path>
    <path
      class="blink"
      d="M51.688 2c0 7.917-4.277 15-10.313 15c6.035 0 10.313 7.084 10.313 15c0-7.916 4.277-15 10.313-15c-6.036 0-10.313-7.083-10.313-15"
    >
    </path>
  </svg>
</div>

<style>
  .blink {
    animation: blink 3s infinite;
  }

  .blink:nth-child(1) {
    animation-delay: 0.5s;
  }

  .blink:nth-child(2) {
    animation-delay: 1.5s;
  }

  .blink:nth-child(3) {
    animation-delay: 2.5s;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
</style>
