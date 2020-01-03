var Rabbit_P, Rabbit_mover, Bubble_P, Question_P, Answer_P1, Answer_P2, Answer_P3, Eggs_P, Egg_P2, Egg_P3, Kuke_P, hdrTexture, eggTask1, eggTask2, eggTask3, eggCol1, eggCol2, eggCol3

function LoadAssets(scene, assetsManager) {
    Bubble_P = new BABYLON.TransformNode("Bubble_P")
    Bubble_P.parent = Question_P

    //ENV TASK
    var envTask = assetsManager.addCubeTextureTask("envTask", "/assets/environment.dds");

    envTask.onSuccess = function (task) {
        //alert('HDR LOADED');
        hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("/assets/environment.dds", scene);

        // Create Skybox
        var hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
        hdrSkybox.visibility = 0
        var hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", scene);
        hdrSkyboxMaterial.backFaceCulling = false;
        hdrSkyboxMaterial.microSurface = 1.0;
        hdrSkyboxMaterial.disableLighting = true;
        hdrSkybox.material = hdrSkyboxMaterial;
        hdrSkybox.infiniteDistance = false;

    }
    envTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }
    
    //RABBIT LOADER
    Rabbit_P = new BABYLON.TransformNode("Rabbit_P")
    Rabbit_P.parent = moveScene_P

    var rabbitTask = assetsManager.addMeshTask("", "", "/assets/hase.glb")

    rabbitTask.onSuccess = function (task) {
        task.loadedMeshes[0].parent = Rabbit_P
        //Rabbit_P.rotation.x = Math.PI/2
        Rabbit_P.scaling = new BABYLON.Vector3(0.015, 0.015, 0.015);
        Rabbit_P.position.z = 0.05

            //enable smooth blending between animationGroups 
    for (var index = 0; index < scene.getAnimationGroupByName("idle").targetedAnimations.length; index++) {
        var animation = scene.getAnimationGroupByName("idle").targetedAnimations[index].animation;
        animation.enableBlending = true;
        animation.blendingSpeed = 0.2;
      }
  
      for (var index = 0; index < scene.getAnimationGroupByName("jump").targetedAnimations.length; index++) {
        var animation = scene.getAnimationGroupByName("jump").targetedAnimations[index].animation;
        animation.enableBlending = true;
        animation.blendingSpeed = 0.2;
      }

    }

    rabbitTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    var blaseTask = assetsManager.addMeshTask("", "", "/assets/sprechblase.glb")
    Question_P = new BABYLON.TransformNode("Question_P", scene)

    blaseTask.onSuccess = function (task) {
        task.loadedMeshes[0].parent = Bubble_P
        Bubble_P.parent = Question_P
        Question_P.parent = moveScene_P
        //Rabbit_P.rotation.x = Math.PI/2
        Bubble_P.scaling = new BABYLON.Vector3(0.001, 0.001, 0.001);

    }

    blaseTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    var answerTask = assetsManager.addMeshTask("", "", "/assets/answerblase.glb")
    Answer_P1 = new BABYLON.TransformNode("Answer_P1", scene)

    answerTask.onSuccess = function (task) {
        task.loadedMeshes[0].parent = Answer_P1
        Answer_P1.scaling = new BABYLON.Vector3(0.04, 0.04, 0.04);
        Answer_P2 = Answer_P1.clone("Answer_P2", false)
        Answer_P3 = Answer_P1.clone("Answer_P3", false)
    }

    answerTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    Load3Eggs(assetsManager)

    //KUKE LOADER
    Kuke_P = new BABYLON.TransformNode("Kuke_P")
    Kuke_P.parent = moveScene_P

    var kukeTask = assetsManager.addMeshTask("", "", "/assets/kuke.glb")

    kukeTask.onSuccess = function (task) {
        task.loadedMeshes[0].parent = Kuke_P
        //makeChildrenInvisble(Kuke_P)
        //task.loadedMeshes[0].position.x = -10
        //Rabbit_P.rotation.x = Math.PI/2
        //Kuke_P.scaling = new BABYLON.Vector3(0.015, 0.015, 0.015);
    }

    kukeTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    //sounds
    var loseTask = assetsManager.addBinaryFileTask("loseTask", "./assets/lose.wav");
    loseTask.onSuccess = function (task) {
        loseSound = new BABYLON.Sound("loseSound", task.data, scene);
        console.log("sound loaded")
    }

    assetsManager.onFinish = function (task) {
        console.log("finish loading assets")
        //pbr.reflectionTexture = hdrTexture
        
        groupEggTops(scene)
        createQuestionary()
        createEggColliders()
        createHole()
        collectEggMats(changeMats) //change mats but first collect eggMats
        createAllAnim()  
        makeAllUnpickable()
        makeChildrenInvisible(moveScene_P)
        

        // These lines load the module, if not already loaded, and then call write
        if (typeof TYPE === "undefined") {
            jQuery.getScript(typeURL).then(nextSet)
            console.log("loaded able to write")
            console.log(jQuery.getScript(typeURL))
        } else {
            console.log("able to write")
            nextSet()
        }
        //awakeExp()

    }
    //Asset Manager check
    assetsManager.onProgress = function (remainingCount, totalCount, lastFinishedTask) {
        engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
    };

    assetsManager.load();
}

function Load3Eggs(assetsManager) {
    //EGG LOADER
    Eggs_P = new BABYLON.TransformNode("Eggs_P")
    Eggs_P.parent = moveScene_P

    var EggsArray = []
    eggTask1 = assetsManager.addMeshTask("", "", "/assets/egg.glb")
    EggsArray.push(eggTask1)
    eggTask2 = assetsManager.addMeshTask("", "", "/assets/egg.glb")
    EggsArray.push(eggTask2)
    eggTask3 = assetsManager.addMeshTask("", "", "/assets/egg.glb")
    EggsArray.push(eggTask3)
    console.log(EggsArray)

    eggTask1.onSuccess = function (task) {
        task.loadedMeshes[0].parent = Eggs_P
        task.loadedMeshes[0].position.y = 5
        task.loadedMeshes[0].position.x = 20
    }

    eggTask2.onSuccess = function (task) {
        task.loadedMeshes[0].parent = Eggs_P
        task.loadedMeshes[0].position.y = 5
        task.loadedMeshes[0].position.x = 0
    }

    eggTask3.onSuccess = function (task) {
        task.loadedMeshes[0].parent = Eggs_P
        task.loadedMeshes[0].position.y = 5
        task.loadedMeshes[0].position.x = -20

    }

    Eggs_P.scaling = new BABYLON.Vector3(0.015, 0.015, 0.015);

}


var EggsTopArray = []
function groupEggTops(scene) {

    for (var k = 0; k < scene.transformNodes.length; k++) {
        if (scene.transformNodes[k].name == "eggTop_P") {
            EggsTopArray.push(scene.transformNodes[k])
        }
    }
    console.log("EGGTOPS")
    console.log(EggsTopArray)
}


function makeChildrenInvisble(parent) {
    parent.getChildMeshes(false, m => m.visibility = 0)
}

function createEggColliders() {
    var colMat = new BABYLON.StandardMaterial("colMat", scene)
    colMat.wireframe = false
    colMat.alpha = 0

    eggCol1 = new BABYLON.MeshBuilder.CreateBox("correct", { height: 25, width: 12, depth: 6 }, scene)
    eggCol1.material = colMat
    eggCol1.position.y = 5
    eggCol1.parent = eggTask1.loadedMeshes[0]

    eggCol2 = new BABYLON.MeshBuilder.CreateBox("wrong", { height: 25, width: 12, depth: 6 }, scene)
    eggCol2.material = colMat
    eggCol2.position.y = 5
    eggCol2.parent = eggTask2.loadedMeshes[0]

    eggCol3 = new BABYLON.MeshBuilder.CreateBox("wrong", { height: 25, width: 12, depth: 6 }, scene)
    eggCol3.material = colMat
    eggCol3.position.y = 5
    eggCol3.parent = eggTask3.loadedMeshes[0]

}



