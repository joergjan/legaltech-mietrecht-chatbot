<script>
  import { onMount } from "svelte";

  let sparkles = [];

  onMount(() => {
    const intervalId = setInterval(() => {
      const newSparkle = {
        id: Math.random(),
        delay: Math.random() * 0.5,
        top: Math.random() * 100,
        left: Math.random() * 100,
      };
      sparkles = [...sparkles, newSparkle];

      // Remove the sparkle after 2 seconds
      setTimeout(() => {
        sparkles = sparkles.filter((sparkle) => sparkle.id !== newSparkle.id);
      }, 2000);
    }, 1000);

    return () => clearInterval(intervalId);
  });
</script>

<div
  class="absolute top-0 bottom-0 right-0 left-0 flex w-full h-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300"
>
  <div class="relative h-full w-full">
    <div class="absolute top-[5rem] bottom-[5rem] left-[5rem] right-[5rem]">
      {#each sparkles as sparkle (sparkle.id)}
        <svg
          style="left: {sparkle.left}%; top: {sparkle.top}%; animation-delay: {sparkle.delay}s"
          width="800px"
          height="800px"
          viewBox="0 0 64 64"
          class="fill-white h-12 w-12 sparkle"
        >
          <path
            d="M22.625 2c0 15.834-8.557 30-20.625 30c12.068 0 20.625 14.167 20.625 30c0-15.833 8.557-30 20.625-30c-12.068 0-20.625-14.166-20.625-30"
          >
          </path>
          <path
            d="M47 32c0 7.918-4.277 15-10.313 15C42.723 47 47 54.084 47 62c0-7.916 4.277-15 10.313-15C51.277 47 47 39.918 47 32z"
          >
          </path>
          <path
            d="M51.688 2c0 7.917-4.277 15-10.313 15c6.035 0 10.313 7.084 10.313 15c0-7.916 4.277-15 10.313-15c-6.036 0-10.313-7.083-10.313-15"
          >
          </path>
        </svg>
      {/each}
    </div>
  </div>
</div>

<style>
  .sparkle {
    position: absolute;
    width: 50px;
    height: 50px;
    animation: sparkle 2s infinite;
    opacity: 0;
  }

  @keyframes sparkle {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
</style>
