<script setup>
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-vue-next";
import { computed, inject } from "vue";
import { cn } from "../../lib/utils";

const props = defineProps({
  class: String,
  containerClassName: String,
});
</script>

<template>
  <OTPInput
    data-slot="input-otp"
    :container-class-name="
      cn('flex items-center gap-2 has-disabled:opacity-50', containerClassName)
    "
    :class="cn('disabled:cursor-not-allowed', $attrs.class)"
    v-bind="$attrs"
  />
</template>
