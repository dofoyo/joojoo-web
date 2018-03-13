import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state:{
		knowledgeTagFilter:'',
	    wrongTagFilter:'',
	    difficultyFilter:'',
	    wrongRateFilter:'',
	    keywordFilter:'',
	    duration:''
	},
	mutations:{
		setDuration(state,val){
			state.duration = val;
		},
		setKnowledgeTagFilter(state,val){
			state.knowledgeTagFilter = val;
		},
		setWrongTagFilter(state,val){
			state.wrongTagFilter = val;
		},
		setDifficultyFilter(state,val){
			state.difficultyFilter = val;
		},
		setWrongRateFilter(state,val){
			state.wrongRateFilter = val;
		},
		setKeywordFilter(state,val){
			state.keywordFilter = val;
		}
	}
});