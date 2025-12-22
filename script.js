let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

let indiceParaExcluir = null;

document.title = "TaskFlow | To Do List";



        const inputTarefa = document.getElementById('tarefa')
        const btn  = document.getElementById('btn')
        const lista = document.getElementById('armazenamento')
        const removerTarefas = document.getElementById('remover')

        const themeToggle = document.getElementById("themeToggle")
        const temaSalvo = localStorage.getItem("tema")


        // Modal
        const overlay = document.getElementById("overlay")
        const confirmarBtn = document.getElementById("confirmarBtn")
        const cancelarBtn = document.getElementById("cancelarBtn")

        // MODAL 2
        

        function AtualizarLista(){
          lista.innerHTML = ""
        

         tarefas.forEach((tarefa, index) =>{
           const item = document.createElement('li')
            item.textContent = tarefa.texto
            item.style.cursor = "pointer"
            item.classList.add("item")


            if (tarefa.resolvida) {
            item.style.color = "green"
            }



           const botaoX = document.createElement('span')
               

            item.appendChild(botaoX)
            lista.appendChild(item)

           //DESTOP
            item.addEventListener('mouseenter', () =>{
                botaoX.classList.add('x')
                botaoX.textContent = "x"
                botaoX.style.cursor ="pointer"
                botaoX.style.display = "flex"
    

            })

            item.addEventListener('mouseleave' ,() =>{
             botaoX.style.display = "none"
            })

          //MOBILE
            let pressTimer;

           item.addEventListener("touchstart", () => {

              pressTimer = setTimeout(() => {

                botaoX.classList.add('x')
                botaoX.textContent = "x"
                botaoX.style.cursor ="pointer"
                botaoX.style.display = "flex"
    
             }, 2000);
              });

             item.addEventListener("touchend", () => {
              botaoX.style.display = "flex"
             });

           item.addEventListener("touchmove", () => {
            botaoX.style.display = "none"
            clearTimeout(pressTimer);
            });

            //MUDAR A COR DAS TAREFAS SE TIVER FEITTA  DESKTOP
             item.addEventListener("dblclick", () => {
            tarefa.resolvida = !tarefa.resolvida

            localStorage.setItem("tarefas", JSON.stringify(tarefas))
            AtualizarLista()
            })
   

             //MOBILE
             let lastTap = 0;

           item.addEventListener("touchend", () => {
           const agora = Date.now();
           const tempoEntreToques = agora - lastTap;
 
          if (tempoEntreToques < 600 && tempoEntreToques > 0) {
            tarefa.resolvida = !tarefa.resolvida
          }

           lastTap = agora;
          });





          
   //BOTÃO X QUE ATIVAR A MODAL
          botaoX.addEventListener('click', () => {
          let titulo = document.getElementById('titulo')
          let paragraphe = document.getElementById("paragraf1")
    
        indiceParaExcluir = index;
        titulo.innerHTML = "Excluir tarefa?";
        paragraphe.innerHTML = "<p>Essa ação não pode ser desfeita.</p>";

        overlay.classList.remove("hidden");
        overlay.style.display = "flex";
        });


         });

         AtualizarBotaoRemover()
         tarefaLength()
        
           
        }// FIM DA FUNÇÃO QUE ATUALIZA A LISTA
        
       
   

        confirmarBtn.onclick = () => {

          if (indiceParaExcluir !== null) {
          tarefas.splice(indiceParaExcluir, 1);
          localStorage.setItem("tarefas", JSON.stringify(tarefas));
          indiceParaExcluir = null;
          AtualizarLista();
          }

           overlay.classList.add("hidden");
           overlay.style.display = "none";
          };


        cancelarBtn.addEventListener('click', () =>{

                     overlay.classList.add("hidden")
                     overlay.style.display ="none"
                })





         // MODAL :  SE O CAMPO DE TAREFA ESTIVEER VAZIO
        function SEMTAREFA(){
           const vazio = document.getElementById("vazio")
           let styleModla = document.getElementById("styleModla")

            vazio.classList.remove("vazio")
            vazio.style.display = "flex" 

             styleModla.style.background = "#FFF8E1"
             styleModla.style.color = "#5D4037"
             styleModla.style.border = "1px solid #FFB300"
             styleModla.style.borderRadius = "6px"
          

            
             const  TEX2 = document.getElementById("#")

          
             TEX2.innerHTML = "<p>Digite uma tarefa antes de adicionar.</p>"
          

            setTimeout( () =>{
              vazio.style.display = "none"
            },3000)

              inputTarefa.value = ""
              inputTarefa.focus()

        }

        
        //event  QUE ADICIONA AS TAREFAS
        btn.addEventListener('click',() =>{
         adicionarTarefa()
  
        
        })

       inputTarefa.addEventListener("keypress"  , function(event){
          if(event.key === "Enter"){
            adicionarTarefa()
          
            
          }
        })
        
           //BOTÃO QUE ADICIONA A TAREFA NA LISTA
        function adicionarTarefa() {
           

            const texto = inputTarefa.value.trim()

            if(texto === ""){
            SEMTAREFA()
            return
            }
      
          
        //  tarefas.push(texto)

        tarefas.push({
           texto: texto,
           resolvida: false
             })


            localStorage.setItem("tarefas", JSON.stringify(tarefas))
            AtualizarLista()

            TarefaAdCoMSucesso()


            inputTarefa.value = ""
            inputTarefa.focus()


        }

       // MODAL : TAREFA ADICIONADA COM SUCESSO!

        function TarefaAdCoMSucesso(){
         const vide = document.getElementById("vazio")
        const styleModla = document.getElementById("styleModla")
        

          vide.classList.remove("vazio")
          vide.style.display = "flex" 


        styleModla.style.background = "#4CAF50"
        styleModla.style.border = "1px solid #43A047"
        styleModla.style.color = "#FFFFFF"
          
          const  p2 = document.getElementById("#")
          const  p1 = document.getElementById("*")
          
          p2.innerHTML = "Tarefa adicionada"


          setTimeout(() =>{ 
         
            vide.style.display = "none"

          },3000)
          
        } 
        


//BOTÃO QUE EXCLUA AS TAREFAS

        // Só adiciona o listener UMA VEZ (logo aqui embaixo!)
removerTarefas.addEventListener('click', () => {
    if(tarefas.length <= 1) return;

    let title = document.getElementById('titulo')
    let paragraf1 = document.getElementById("paragraf1");
    
    title.innerHTML = "Excluir todas as tarefas?"
    paragraf1.innerHTML = "<p>Essa ação não pode ser desfeita.</p>";

    overlay.classList.remove("hidden");
    overlay.style.display = "flex";

    confirmarAExclusãoTotal();
    CancelarAExclusãoTotal();
});


 function confirmarAExclusãoTotal() {
               confirmarBtn.addEventListener('click',() =>{

               
               localStorage.removeItem("tarefas")
               tarefas = []

               overlay.classList.add("hidden")
               overlay.style.display ="none"

               AtualizarLista()
                })
            }

            function CancelarAExclusãoTotal(){

                cancelarBtn.addEventListener('click'  , () =>{

                     overlay.classList.add("hidden")
                     overlay.style.display ="none"
                    
                })
            }

          
//FUNÇÃO QUE CALCULA SE EXISTE UMA TAREFA SALVA, CASO CONTRÁRIO ELE REMOVE AS FORMATAÇÃO DOS ITEM
 function tarefaLength(){
if(tarefas.length <= 0){
 lista.classList.remove("armazenaLista")
}else
{
   lista.classList.add("armazenaLista")
}
}


    function AtualizarBotaoRemover(){
    if(tarefas.length <= 1){

        removerTarefas.style.display = "none";
         removerTarefas.classList.remove("remover")
         
       

                  btn.style.display= "flex"
                  btn.style.justifyContent ="center"
                  btn.style.alignItems = "center"
                  btn.style.width = "410px"
                  btn.style.textAlign = "center" 
                  btn.classList.add("btn")

                  
    } else {
               

                  btn.style.display= "flex"
                  btn.style.justifyContent ="center"
                  btn.style.alignItems = "center"
                  btn.style.width = "150px"
                  btn.style.textAlign = "center"
         
         removerTarefas.style.display = "flex"
         removerTarefas.classList.add("remover")
         removerTarefas.style.justifyContent ="center"
         removerTarefas.style.alignItems = "center"
              
         removerTarefas.style.textAlign = "center"

        
    }
}

            


        AtualizarLista()
        AtualizarBotaoRemover()
      


      

if (temaSalvo === "dark") {
  document.body.classList.add("dark")
  themeToggle.textContent = "🔆"
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark")

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("tema", "dark")
    themeToggle.textContent = "🔆"
  } else {
    localStorage.setItem("tema", "light")
    themeToggle.textContent = "🌙"
  }
})




