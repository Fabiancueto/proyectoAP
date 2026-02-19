<script setup>
import { provide, inject, computed, useId } from "vue";

const props = defineProps({
  id: String,
  class: String,
  config: { type: Object, required: true }
});

const chartId = `chart-${props.id || Math.random().toString(36).slice(2)}`;
provide("chartConfig", props.config);

const THEMES = { light: "", dark: ".dark" };

const styleText = computed(() => {
  const colorConfig = Object.entries(props.config).filter(
    ([, c]) => c.theme || c.color
  );
  if (!colorConfig.length) return "";

  return Object.entries(THEMES)
    .map(([theme, prefix]) => {
      return `
${prefix} [data-chart=${chartId}] {
${colorConfig
  .map(([key, item]) => {
    const color = item.theme?.[theme] || item.color;
    return color ? `--color-${key}: ${color};` : "";
  })
  .join("\n")}
}`;
    })
    .join("\n");
});
</script>

<template>
  <div
    data-slot="chart"
    :data-chart="chartId"
    :class="[
      '[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke=#ccc]]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke=#ccc]]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke=#ccc]]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke=#fff]]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke=#fff]]:stroke-transparent [&_.recharts-surface]:outline-hidden',
      props.class
    ]"
  >
    <style v-if="styleText" v-html="styleText"></style>
    <slot />
  </div>
</template>

