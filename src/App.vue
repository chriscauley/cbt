<template>
  <div>
    <app-nav />
    <router-view class="app-wrapper" />
  </div>
</template>

<script>
import AppNav from '@/components/AppNav'

export default {
  components: { AppNav },
}
</script>
