<template>
    <div
    >
        <v-toolbar
            color="cyan lighten-3"
            dark
        >
            <v-icon @click="$router.push('/')">fas fa-graduation-cap</v-icon>
            <v-toolbar-title>
                    Advanced Deep Learning
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-toolbar-items v-for="comp in comps" :key="comp.id">
              <v-btn flat @click="$router.push(appendPath('/comp', comp))">{{ comp }}</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
import db from '../main'
import 'firebase/firestore'

export default {
  name: 'appheader',
  data () {
    return {
      comps: []
    }
  },
  mounted () {
    db.collection('competitions').get().then(
      (q) => {
        q.forEach((doc) => {
          this.comps.push(doc.id)
        })
      }
    )
  },
  methods: {
    appendPath (str, path) {
      return str + '/' + path.toString()
    }
  }
}
</script>

<style scoped>
</style>
