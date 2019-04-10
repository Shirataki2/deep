<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-sheet
          class="d-flex pb-5"
          color="purple lighten-4"
          height="220"
        />
        <h1 class="text-xs-center"
            style="position: relative; bottom: 130px;color: white; margin-bottom: -30px"
        >
            Competition {{ $route.params.competition }}
        </h1>
        <v-container>
            <v-data-table
                :headers="headers"
                :items="posts"
                class="elevation-4"
                hide-actions
            >
                <template v-slot:items="props">
                    <td align="right"> {{ props.item.order }} </td>
                    <td> {{ props.item.name }} </td>
                    <td align="center"> {{ props.item.acc }} </td>
                    <td align="center"> {{ props.item.date }} </td>
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>

<script>
import db from '../main'
import 'firebase/firestore'

export default {
  name: 'competition',
  data () {
    return {
      headers: [
        {text: 'Rank', align: 'right', sortable: false},
        {text: 'Name', align: 'left', sortable: false},
        {text: 'Accuracy', align: 'center', sortable: false},
        {text: 'Date', align: 'center', sortable: false}
      ],
      posts: []
    }
  },
  mounted: function () {
    db.collection('competitions')
      .doc(this.$route.params.competition)
      .collection('posts')
      .orderBy('acc', 'desc')
      .onSnapshot(
        (q) => {
          this.posts = []
          console.log(q)
          let i = 1
          q.forEach((doc) => {
            const d = doc.data()
            this.posts.push({
              id: d.uuid,
              order: i,
              name: d.name,
              acc: Math.round(d.acc * 1000000) / 10000,
              date: d.post_at.toDate().toLocaleString()
            })
            i += 1
          })
        }
      )
  }
}
</script>

<style scoped>
* {
    transition: opacity 0.8s ease-in-out;
}
</style>
