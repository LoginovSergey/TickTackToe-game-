/*---------------------start controller--------------------------------*/
let controller = {
	goToPage: function (){
		let game_field = `<div id="field"></div></section><div id="chet"><p id="back">return</p><p id="clear">clear playing field</p><div class="rule">Rule: The game is played by two users who choose among themselves what will play with a cross or a toe and in turn enter in the console window through the keyboard the numbers responsible for the cells. The winner is the user who will be the first to make a winning combination of 3 consecutive crosses or zeros horizontally, vertically or diagonally.</div><p> win x: <span id="x">0</span></p><p> win o: <span id="o">0</span></p></div>`;
		let btn = document.getElementsByClassName('btn');
		Array.from(btn).forEach(function(par){
			par.addEventListener('click', function (){
			document.body.innerHTML = game_field;
				view.blocks();
				model.playPVP();
			});
		})
	},
	backToTheFuture: function (){
		let returnToPage = `<div class="welcome">welcome to tick-tac-toe</div><div class="btn">Play 1 vs 1</div><div class="btn">Play with PC</div>`;
		let clickReturn = document.getElementById('back');
		clickReturn.addEventListener('click', function (){
			document.body.innerHTML = returnToPage;
			controller.goToPage();
		});
	},
	clearField: function(){
		for (let block of document.getElementsByClassName('block')){
			block.innerHTML = '';
		}
	},
}
		controller.goToPage();
/*--------------------------end controller----------------------------*/
/*-------------------------start view--------------------------------*/
let view = {
	blocks: function (){
		for(let i = 0; i < 9; i++){
			document.getElementById('field').innerHTML+='<div class="block"></div>';
		}
		controller.backToTheFuture();
	},
	clickAudio: function(){
	let audio = new Audio();
	audio.src = 'mel.mp3';
	audio.autoplay = true;
	}
}
/*--------------------------end view---------------------------------*/
/*-----------------------start model--------------------------------*/
let model = {
		winners: [
	    [
	        [1,1,1],
	        [0,0,0],
	        [0,0,0]
	    ],
	    [
	        [0,0,0],
	        [1,1,1],
	        [0,0,0]
	    ],
	    [
	        [0,0,0],
	        [0,0,0],
	        [1,1,1]
	    ],
	    [
	        [1,0,0],
	        [1,0,0],
	        [1,0,0]
	    ],
	    [
	        [0,1,0],
	        [0,1,0],
	        [0,1,0]
	    ],
	    [
	        [0,0,1],
	        [0,0,1],
	        [0,0,1]
	    ],
	    [
	        [1,0,0],
	        [0,1,0],
	        [0,0,1]
	    ],
	    [
	        [0,0,1],
	        [0,1,0],
	        [1,0,0]
	    ],
	],
	playPVP: function(){
	let scoreX = document.getElementById('x').innerHTML = +localStorage.getItem('scoreForX');
	let scoreO = document.getElementById('o').innerHTML = +localStorage.getItem('scoreForO');
 	let x = document.getElementById('x');
	let o = document.getElementById('o');
	let step = 0;
	let add_X_or_O = document.getElementById('field').addEventListener('click', function(){
	    if (event.target.className === 'block' && event.target.innerHTML === '') {
	        if (step % 2 === 0) {
	            event.target.innerHTML = 'x';
	        } else {
	            event.target.innerHTML = 'o'
	        }
	        step++;
	        if (model.winnerPosition('x') === true) {
	            x.innerHTML = ++scoreX;
	            localStorage.setItem('scoreForX', scoreX);
	            setTimeout(function(){controller.clearField()},200)
	        }
	        if (model.winnerPosition('o') === true) {
	            o.innerHTML = ++scoreO;
	            localStorage.setItem('scoreForO', scoreO);
	            setTimeout(function(){controller.clearField()},200)
	        }
	    }
        });
	let clear = document.getElementById('clear').addEventListener('click', function(){
		controller.clearField();
	});
},
	validate_game: function (array, param){
        let elem_num = 0;
        let all_blocks = document.getElementsByClassName('block');
        let validate_num = 0;
        let validate_equals = 0;
        for(let row of array){
            for(let col of row){
                if(col === 1){
                    validate_num++;
                    if(all_blocks[elem_num].innerHTML === param){
                        validate_equals++;
                    }
                }
                elem_num++;
            }
        }
        return validate_equals === validate_num;
    },
    winnerPosition: function(param) {
        for(let win of this.winners){
            if(model.validate_game(win, param) === true){
                return true;
            }
        }
        return false;
	},
}
/*-----------------------end model--------------------------------*/
