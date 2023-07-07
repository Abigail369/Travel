<template>
  <div>
    <div id="he-plugin-standard" />
  </div>
</template>

<script>
export default {
  created() {
    window.WIDGET = {
      "CONFIG": {
        "layout": "1",
        "width": "450",
        "height": "276",
        "background": "5",
        "dataColor": "FFFFFF",
        "language": "zh",
        "borderRadius": "5",
        "modules": "10",
        "key": "16ff779498984495b3d3e689fe9cea6f"
      }
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0'
    document.getElementsByTagName('head')[0].appendChild(script)
  }
}
</script>

<style>

</style>
