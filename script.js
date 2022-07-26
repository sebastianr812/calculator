let currentNumber=''
let previousNumber=''
let operator=''

const previousDisplayNum=document.querySelector('.previous_num')
const currentDisplayNum=document.querySelector('.current_num')
const decimal=document.querySelector('.decimal')
const equals=document.querySelector('.equals')
const clear=document.querySelector('.clear')
const numbers=document.querySelectorAll('.number')
const operators=document.querySelectorAll('.operator')

window.addEventListener('keydown',handleKeyPress)


numbers.forEach((key)=>{
      key.addEventListener('click', (e)=>{
          handleNumber(e.target.textContent)
      })
})

operators.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        handleOperator(e.target.textContent)
        
    })
})

equals.addEventListener('click',()=>{
    if(currentNumber!=''&&previousNumber!=''){
        calculate()
    }
})

function handleNumber(number){
    if(currentNumber!==''&& previousNumber!==''&&operator===''){
        previousNumber=''
        currentDisplayNum.textContent=currentNumber
    }
    if(currentNumber.length<=25){
        currentNumber+=number;
    currentDisplayNum.textContent=currentNumber;
    }
}

clear.addEventListener('click',()=> {
    clearCalculator()
})

decimal.addEventListener('click',()=>{
    addDecimal()
})

function addDecimal(){
    if(!currentNumber.includes(".")){
        currentNumber=currentNumber+'.'
        currentDisplayNum.textContent=currentNumber
    } 
}

function clearCalculator(){
    currentNumber=''
    previousNumber=''
    operator=''
    currentDisplayNum.textContent=''
    previousDisplayNum.textContent=''
}

function handleOperator(op){
    if(previousNumber===''){
        previousNumber=currentNumber
        operatorCheck(op)
    }else if(currentNumber===''){
        operatorCheck(op)
    }else {
        calculate()
        operator=op
        currentDisplayNum.textContent='0'
        previousDisplayNum.textContent=previousNumber+ ' '+ operator
    }

}

function operatorCheck(text){
     operator=text
     previousDisplayNum.textContent=previousNumber+ ' '+operator
     currentDisplayNum.textContent=''
     currentNumber=''
}



function calculate(){
    previousNumber=Number(previousNumber)
    currentNumber=Number(currentNumber)

    if(operator==="+"){
        previousNumber=previousNumber+currentNumber
    }else if(operator==="-"){
        previousNumber=previousNumber-currentNumber
    }else if(operator==='x'){
        previousNumber=previousNumber*currentNumber
    }else if(operator==='/'){
        if(currentNumber<=0){
            previousNumber='ERROR CANNOT DIVIDE BY 0'
            previousDisplayNum.textContent=''
            currentDisplayNum.textContent=previousNumber
            operator=""
            return
        }else {
            previousNumber=previousNumber/currentNumber
        }
    }
    previousNumber=roundNumber(previousNumber)
    previousNumber=previousNumber.toString()
    displayResults()
}

function roundNumber(num){
    return Math.round(num*100000)/100000
}

function displayResults(){
    

    if(previousNumber.length<=12){
        currentDisplayNum.textContent=previousNumber
    }else {
        currentDisplayNum.textContent=previousNumber.slice(0,12)+"..."
    }
    previousDisplayNum.textContent=''
    operator=''
    currentNumber=''
}

function handleDelete(){
    if(currentNumber!=''){
        currentNumber=currentNumber.slice(0,-1)
        currentDisplayNum.textContent=currentNumber
    }
    if(currentNumber===''){
        currentDisplayNum.textContent='0'
    }
    if(currentNumber===''&&previousNumber!==''&&operator===''){
        previousNumber=previousNumber.slice(0,-1)
        currentDisplayNum.textContent=previousNumber
    }
}

function handleKeyPress(e){
     e.preventDefault()
     if(e.key>=0 && e.key <=9){
        handleNumber(e.key)
     }
     if(e.key==='Enter' || e.key==='=' && currentNumber!=""&&previousNumber!=''){ 
         calculate()
     }
     if(e.key==='+' ||e.key==='-'||e.key==='/'){
         handleOperator(e.key)
     }
     if(e.key==='*'){
         handleOperator('x')
     }
     if(e.key==='.'){
        addDecimal()
     }
     if(e.key==='Backspace'){
        handleDelete()
     }
     
     
     
}














