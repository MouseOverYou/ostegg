var win = true
var started = false;
function startExp(){
    if(!started){
        depthMask.visibility =1 
        window.setTimeout(()=>{
            hole.visibility = 1
        },100)//for visibility bug handling
        jumpOut()
        eggTask1.loadedMeshes[0].scaling = new BABYLON.Vector3(0,0,0)
        eggTask2.loadedMeshes[0].scaling = new BABYLON.Vector3(0,0,0)
        eggTask3.loadedMeshes[0].scaling = new BABYLON.Vector3(0,0,0)
        makeChildrenVisible(Eggs_P)
        window.setTimeout(showQuestions, 7000)
        window.setTimeout(AddShadows, 2500)
        window.setTimeout(()=>{
            makeChildrenVisible(Rabbit_P)
        },150)//for visibility bug handling
        started = true;
        
    }

}

function showQuestions(){
    depthMask.visibility =0 
    letterMat.alpha=1
    makeChildrenVisible(Question_P)
}
function awakeExp(){
    
    
}

function callKukeAnim(){
    //scene.beginAnimation(scene.getMeshByName("armL"), 0, 12, true)
    kukeAnimGroup.play(true)
}

var eggMove
function callChoose(chosen, num){
    //move egg to the middle, on complete: open egg
    //var eggName = eggCol + chosen.toString()
    //console.log(eggName);
    eggMove = chosen.parent
    gsap.fromTo(eggMove.position,{x: eggMove.position.x}, {duration:1, ease: "none", x:0 })
    gsap.fromTo(eggMove.position,{z: eggMove.position.z},{duration:1,ease: "power4.out", z:15 , onCompleteParams: [num, chosen], onComplete:revealEgg})
}

var  resultTime = 2000
function revealEgg(num, chosen){
    
    eggsPickable(false);
    scene.beginAnimation(chosen.parent.getChildTransformNodes(false)[1], 25, 0, false);
    console.log(chosen.parent.getChildTransformNodes(false)[1])
    //move kueke to EGG
    Kuke_P.parent = chosen.parent
    makeChildrenVisible(Kuke_P)
    callKukeAnim()
    if (win){
        Kuke_P.position.y =0
        Kuke_P.rotation.x = Math.PI*2
        winParticlesLeft.start()
        winParticlesRight.start()
        window.setTimeout(nextSet, 4000)
        scene.getAnimationGroupByName("jump").start(true)
    }
    else {
        //lose
        Kuke_P.position.y =6
        Kuke_P.rotation.x = Math.PI
        loseSound.play()
    }

    window.setTimeout(backEgg, resultTime ,chosen)
    
}

function backEgg(chosen){
    scene.getAnimationGroupByName("jump").stop(true)
    scene.getAnimationGroupByName("idle").start(true)
    winParticlesRight.stop()
    winParticlesLeft.stop()
    scene.beginAnimation(chosen.parent.getChildTransformNodes(false)[1], 0, 25, false);
    window.setTimeout(()=>{
        makeChildrenInvisible(Kuke_P);
        eggsPickable(true);
    },650)
    
    //move kueke to EGG
    gsap.to(eggMove.position, {duration:1, ease: "none", x: originalPosX })
    gsap.to(eggMove.position, {duration:1, ease: "power4.in", z: 0})

}

function makeChildrenVisible(parent) {
    parent.getChildMeshes(false, m => m.visibility = 1)
}

function makeChildrenInvisible(parent) {
    parent.getChildMeshes(false, m => m.visibility = 0)
}

function makeAllUnpickable(){
    for(var j=0; j<scene.meshes.length; j++){
        if( (scene.meshes[j].name == "correct") || (scene.meshes[j].name == "wrong") || (scene.meshes[j].name == "ground")){
            scene.meshes[j].isPickable =true
        }
        else{
            scene.meshes[j].isPickable =false
        }
    }
}

function eggsPickable(allow){
    if(allow){
        eggCol1.isPickable = true;
        eggCol2.isPickable = true;
        eggCol3.isPickable = true;
    }
    else{
        eggCol1.isPickable = false;
        eggCol2.isPickable = false;
        eggCol3.isPickable = false;
    }
    
}

function makeRabbitJump(){
    scene.getAnimationGroupByName("idle").stop(true)
    scene.getAnimationGroupByName("jump").start(true)
window.setTimeout(()=>{ scene.getAnimationGroupByName("jump").stop(true)
                        scene.getAnimationGroupByName("idle").start(true)
                    
                        },1000)
    
}

function jumpOut(){

    //hole
    gsap.from(hole.scaling, {duration: 1, ease: "bounce", x: 0, y: 0, z: 0, onComplete: makeRabbitJump})
    gsap.from(Rabbit_P.position, {delay: 1, duration: 0.5, ease: "power1.out", y: -0.5 })
    window.setTimeout(jumpRevealAnim, 4000)
}

function jumpRevealAnim(){
    gsap.to(hole.scaling, {duration: 1, ease: "bounce", x: 0, y: 0, z: 0})
    var tl = gsap.timeline();
    console.log("4s later")
    //HASE
    makeRabbitJump()
    tl.fromTo(Rabbit_P.position,{x: -0.0}, { duration: 1.1, ease: "power1.in", x: -0.7 });
    //EIER EINZELN
    tl.fromTo([eggTask1.loadedMeshes[0].position, eggTask2.loadedMeshes[0].position, eggTask3.loadedMeshes[0].position],{y: 0.0}, { stagger:0.3, duration: 0.3,  ease: "back", y: 4 }, 0.3)
    tl.fromTo([eggTask1.loadedMeshes[0].scaling, eggTask2.loadedMeshes[0].scaling, eggTask3.loadedMeshes[0].scaling], {x:0, y:0, z:0 }, { stagger:0.3,duration: 0.3, ease: "back", x:1, y:1,z:-1 }, 0.3)
    //EIER GRUPPE
    tl.fromTo(Eggs_P.rotation,{z: 0}, { duration: 0.5, ease: "back", z: (15*Math.PI*2)/360 });
    tl.fromTo(Eggs_P.position,{x: -0.3}, { duration: 0.5, ease: "back", x: 0 });
    tl.to(Eggs_P.rotation, { duration: 0.75, ease: "back", z: 0 }, "-=0.5");
}

