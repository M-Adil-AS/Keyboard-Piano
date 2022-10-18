const piano = document.querySelector('#piano')
const data = ['C','D','E','F','G','A','B']

let html = ''
for(let octave=0; octave<2; octave++){
    for(let i=0; i<data.length; i++){
        let hasSharp = (data[i]!='E' && data[i]!='B') ? true : false
        html+=`<div class='whiteNote' data-code='${data[i]}${octave+4}'>`
        if(hasSharp){
            html+=`<div class='blackNote' data-code='${data[i]}#${octave+4}'></div>`
        }
        html+=`</div>`
    }
}
piano.insertAdjacentHTML('beforeend',html)

const notes = document.querySelectorAll('.whiteNote, .blackNote')
const keys = ["Tab","1","q","2","w","e","4","r","5","t","6","y","u","8","i","9","o","p","-","[","=","]","Backspace","\\"]
const synth = new Tone.PolySynth(Tone.Synth).toDestination()

document.addEventListener('keydown',(e)=>{
    e.preventDefault()
    if(!e.repeat){
        keys.forEach((key,index)=>{
            if(e.key==key){
                notes[index].style.background = (notes[index].classList.contains('whiteNote')) ? '#ccc' : 'black'
                synth.triggerAttackRelease(notes[index].dataset.code,'16n')
            }
        })
    }
})

document.addEventListener('keyup',(e)=>{
    keys.forEach((key,index)=>{
        if(e.key==key){
            notes[index].style.background = (notes[index].classList.contains('whiteNote')) ? 'white' : '#777'
        }
    })
})