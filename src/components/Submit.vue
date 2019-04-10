<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-sheet
          class="d-flex pb-5"
          color="indigo lighten-3"
          height="220"
        />
        <h1 class="text-xs-center"
            style="position: relative; bottom: 170px;color: white; margin-bottom: -30px"
        >
            Competition {{ $route.params.competition }}
        </h1>
        <h1 class="text-xs-center"
            style="position: relative; bottom: 90px;color: white; margin-bottom: -30px"
        >
            Your Rank: {{ rankSuffix(attention.order) }}
        </h1>
        <v-container>
            <v-data-table
                :headers="headers"
                :items="posts"
                class="elevation-4"
                hide-actions
            >
                <template v-slot:items="props">
                    <tr :class="{att: isCurrentRank(props.item.order)}">
                    <td align="right"> {{ props.item.order }} </td>
                    <td> {{ props.item.name }} </td>
                    <td align="center"> {{ props.item.acc }} </td>
                    <td align="center"> {{ props.item.date }} </td>
                    </tr>
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>

<script>
import db from '../main'
import 'firebase/firestore'

export default {
  name: 'submit',
  data () {
    return {
      headers: [
        {text: 'Rank', align: 'right', sortable: false},
        {text: 'Name', align: 'left', sortable: false},
        {text: 'Accuracy', align: 'center', sortable: false},
        {text: 'Date', align: 'center', sortable: false}
      ],
      posts: [],
      attention: null
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
            const dd = {
              id: d.uuid,
              order: i,
              name: d.name,
              acc: Math.round(d.acc * 1000000) / 10000,
              date: d.post_at.toDate().toLocaleString()
            }
            this.posts.push(dd)
            i += 1
            if (this.$route.params.submit === d.uuid) {
              this.attention = dd
            }
          })
        }
      )
  },
  methods: {
    isCurrentRank (rank) {
      return rank === this.attention.order
    },
    rankSuffix (rank) {
      switch (rank.toString()[rank.toString().length - 1]) {
        case '1':
          return `${rank}st`
        case '2':
          return `${rank}nd`
        case '3':
          return `${rank}rd`
        default:
          return `${rank}th`
      }
    }
  }
}
</script>

<style scoped lang="scss">
.att {
    background: royalblue;
    color: white;
    &:hover {
        background: #101a83 !important;
    }
}
</style>
