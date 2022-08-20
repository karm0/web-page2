let chooseImg = document.querySelector(".choose-img")
        let fileInput = document.querySelector(".file-input");     
        let imges= document.querySelector(".imges img");
        let button= document.querySelectorAll(".filter button"); 
        let infoName= document.querySelector(".filter-info .name"); 
        let infoValue= document.querySelector(".filter-info .value"); 
        let inputSlider= document.querySelector(".slider input"); 
        let rotateButton = document.querySelectorAll(".rotate button"); 
        let reset = document.querySelector(".reset"); 
        
        let brightness = 100, suturation = 100, inversion = 0, grayscale = 0;
        let rotate = 0, horizontal = 1, vertical = 1;
        let applyFilter = () => {
            imges.style.transform = `rotate(${rotate}deg) scale(${horizontal}, ${vertical})`;
            imges.style.filter = `brightness(${brightness}%) saturate(${suturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
        }
        
        let loadImg = () => {
            let file = fileInput.files[0];
            if(!file) return;
            imges.src = URL.createObjectURL(file);
            imges.addEventListener("load", ()=>{
                document.querySelector(".container").classList.remove("disable");
            })
        }
        button.forEach(option => {
            option.addEventListener("click", () => {
                document.querySelector(".filter .active").classList.remove("active");
                option.classList.add("active");
                infoName.textContent = option.textContent;

                if(option.id === "brightness"){
                    inputSlider.max = "200";
                    inputSlider.value = brightness;
                    infoValue.textContent = `${brightness}%`
                }else if(option.id === "suturation"){
                    inputSlider.max = "200";
                    inputSlider.value = suturation;
                    infoValue.textContent = `${suturation}%`
                }else if(option.id === "inversion"){
                    inputSlider.max = "100";
                    inputSlider.value = inversion;
                    infoValue.textContent = `${inversion}%`
                }else{
                    inputSlider.max = "100";
                    inputSlider.value = grayscale;
                    infoValue.textContent = `${grayscale}%`
                }
            });
        });

        let changValue = () =>{
            infoValue.textContent = `${inputSlider.value}%`;
            let selectElement = document.querySelector(".filter .active");

            if(selectElement.id === "brightness"){
                brightness = inputSlider.value;
            }else if(selectElement.id === "suturation"){
                suturation = inputSlider.value;
            }else if(selectElement.id === "inversion"){
                inversion = inputSlider.value;
            }else{
                grayscale = inputSlider.value;
            }
            applyFilter ();
        }
        rotateButton.forEach(option => {
            option.addEventListener("click", ()=>{
                if(option.id === "left"){
                    rotate -= 90;
                }else if(option.id === "right"){
                    rotate += 90;
                }else if(option.id === "horizontal"){
                    horizontal = horizontal === 1 ? -1 : 1;
                }else{
                    vertical = vertical === 1 ? -1 :1;
                }
                applyFilter();
            })
        })

        let removeFilter = () => {
            brightness = 100, suturation = 100, inversion = 0, grayscale = 0;
            rotate = 0, horizontal = 1, vertical = 1;
            button[0].click();
            applyFilter()
        }



        fileInput.addEventListener("change", loadImg);
        inputSlider.addEventListener("input", changValue);
        reset.addEventListener("click", removeFilter);
        chooseImg.addEventListener("click", () => fileInput.click());