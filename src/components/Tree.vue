<template>
  <div id="tree" style="position: relative; width: 100%; height: 100%;">
    <svg id="tree-svg"></svg>
  </div>
</template>

<script>
export default {
  name: 'Tree',
  data() {
    return {
      padding: 40,
      width: 600,
      height: 700,
      value: {
        name: 'Lao Lao',
        title: 'general manager',
        children: [
          { name: 'Bo Miao', title: 'department manager' },
          {
            name: 'Su Miao',
            title: 'department manager',
            children: [
              { name: 'Tie Hua', title: 'senior engineer' },
              {
                name: 'Hei Hei',
                title: 'senior engineer',
                children: [
                  { name: 'Pang Pang', title: 'engineer' },
                  { name: 'Xiang Xiang', title: 'UE engineer' }
                ]
              }
            ]
          },
          { name: 'Hong Miao', title: 'department manager' }
        ]
      },
      g: null,
      values: [],
      xScale: null,
      yScale: null
    }
  },
  methods: {
    initChartContainer() {
      this.g = this.$d3
        .select('#tree-svg')
        .append('g')
        .attr('transform', `translate(0, 0)`)
    },
    start() {
      // craete tree data
      const hierarchyData = this.$d3.hierarchy(this.value)
      const treeGenerator = this.$d3.tree().size([600, 600])
      const treeData = treeGenerator(hierarchyData)
      // draw tree data with svg
      this.showTreeNodes(treeData.descendants())
      this.showTreeLinks(treeData.links())
    },
    showTreeNodes(nodesData) {
      /**
        node.data:
        height:3
        parent:null
        x:300
        y:0
       */
      const nodes = this.g.selectAll('.node').data(nodesData)
      nodes
        .enter()
        .append('circle')
        .merge(nodes)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 10)
        .append('title', d => d.name)
      nodes.exit().remove()
    },
    showTreeLinks(linksData) {
      const links = this.g.selectAll('.link').data(linksData)
      const lineFunc = this.$d3
        .line()
        .x(d => d.x)
        .y(d => d.y)
      links
        .enter()
        .append('path')
        .merge(links)
        .attr('d', d => lineFunc([d.source, d.target]))
        .attr('class', 'link')
    }
  },
  mounted() {
    this.initChartContainer()
    this.start()
    window.vue = this
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
#tree {
  #tree-svg {
    padding-left: 30px;
    padding-top: 30px;
    width: 100%;
    height: 100%;
  }

  circle {
    fill: teal;
  }

  .link {
    stroke: teal;
  }
}
</style>
