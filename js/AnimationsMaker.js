//kuke win: arms and legs
var hole, holeMat

function createHole() {
    hole = new BABYLON.MeshBuilder.CreateDisc("hole", { radius: 0.2 }, scene)
    hole.rotation = new BABYLON.Vector3(Math.PI / 2, Math.PI, 0)
    hole.parent = moveScene_P
    holeMat = new BABYLON.PBRMaterial("holeMat", scene)
    hole.material = holeMat

    depthMask.registerBeforeRender(function () {
        engine.setColorWrite(false);
    });

    depthMask.registerAfterRender(function () {
        engine.setColorWrite(true);
    })

}
//egg Open
var kukeAnimGroup
var eggAnimGroup

function createAllAnim(){
    makeKukeAnim()
    makeEggAnim()
    createWinParticles()
}
function makeKukeAnim() {
    kukeAnimGroup = new BABYLON.AnimationGroup("kukeAnimGroup");

    var yLArmRot = new BABYLON.Animation("yLRot", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keysYLArm = []
    keysYLArm.push({ frame: 0, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), 150 * (Math.PI / 180)) })
    keysYLArm.push({ frame: 3, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), 210 * (Math.PI / 180)) })
    keysYLArm.push({ frame: 9, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), 150 * (Math.PI / 180)) })
    yLArmRot.setKeys(keysYLArm)

    var xLArmRot = new BABYLON.Animation("xLRot", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keysXLArm = []
    keysXLArm.push({ frame: 0, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 0, 1), 160 * (Math.PI / 180)) })
    keysXLArm.push({ frame: 3, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 0, 1), 200 * (Math.PI / 180)) })
    keysXLArm.push({ frame: 9, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 0, 1), 160 * (Math.PI / 180)) })
    xLArmRot.setKeys(keysXLArm)

    var yRArmRot = new BABYLON.Animation("yRRot", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keysYRArm = []
    keysYRArm.push({ frame: 0, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), -30 * (Math.PI / 180)) })
    keysYRArm.push({ frame: 3, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), 30 * (Math.PI / 180)) })
    keysYRArm.push({ frame: 9, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), -30 * (Math.PI / 180)) })
    yRArmRot.setKeys(keysYRArm)

    var xRArmRot = new BABYLON.Animation("xRRot", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keysXRArm = []
    keysXRArm.push({ frame: 0, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 0, 1), 20 * (Math.PI / 180)) })
    keysXRArm.push({ frame: 3, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 0, 1), -20 * (Math.PI / 180)) })
    keysXRArm.push({ frame: 9, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 0, 1), 20 * (Math.PI / 180)) })
    xRArmRot.setKeys(keysXRArm)

    var beinRot = new BABYLON.Animation("beinRot", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keysBein = []
    keysBein.push({ frame: 0, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(1, 0, 0), -50 * (Math.PI / 180)) })
    keysBein.push({ frame: 10, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(1, 0, 0), 50 * (Math.PI / 180)) })
    keysBein.push({ frame: 20, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(1, 0, 0), -50 * (Math.PI / 180)) })
    beinRot.setKeys(keysBein)

    var beinRotR = new BABYLON.Animation("beinRot", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keysRBein = []
    keysRBein.push({ frame: 0, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(1, 0, 0), 50 * (Math.PI / 180)) })
    keysRBein.push({ frame: 10, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(1, 0, 0), -50 * (Math.PI / 180)) })
    keysRBein.push({ frame: 20, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(1, 0, 0), 50 * (Math.PI / 180)) })
    beinRotR.setKeys(keysRBein)


    //scene.getMeshByName("armL").animations = []
    kukeAnimGroup.addTargetedAnimation(yLArmRot, scene.getMeshByName("armL"))
    kukeAnimGroup.addTargetedAnimation(xLArmRot, scene.getMeshByName("armL"))
    kukeAnimGroup.addTargetedAnimation(yRArmRot, scene.getMeshByName("armR"))
    kukeAnimGroup.addTargetedAnimation(xRArmRot, scene.getMeshByName("armR"))
    kukeAnimGroup.addTargetedAnimation(beinRot, scene.getMeshByName("beinL"))
    kukeAnimGroup.addTargetedAnimation(beinRotR, scene.getMeshByName("beinR"))
    console.log(scene.getMeshByName("beinL"))

}

function makeEggAnim() {
    eggAnimGroup = new BABYLON.AnimationGroup("eggAnimGroup");

    var openEggAnim = new BABYLON.Animation("openEggAnim", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var openEggKeys = []
    openEggKeys.push({ frame: 0, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(1, 0, 0), -90 * (Math.PI / 180)) })
    openEggKeys.push({ frame: 25, value: new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(1, 0, 0), 0) })
    openEggAnim.setKeys(openEggKeys)

    EggsTopArray[0].animations = [];
    EggsTopArray[0].animations.push(openEggAnim);

    EggsTopArray[1].animations = [];
    EggsTopArray[1].animations.push(openEggAnim);

    EggsTopArray[2].animations = [];
    EggsTopArray[2].animations.push(openEggAnim);

}

var emitterWin, winParticlesLeft
function createWinParticles() {
    // Fountain object
    emitterWin = BABYLON.Mesh.CreateBox("emitterWin", 0.1, scene);
    emitterWin.position.z = 0.15
    emitterWin.isVisible = false
    //rainP.rotation.x = Math.PI / 2
    emitterWin.parent = moveScene_P

    winParticlesLeft = new BABYLON.ParticleSystem("rain", 20, scene, null, true);
    winParticlesLeft.particleTexture = new BABYLON.Texture("/assets/spriteswin.png", scene, true,
        false, BABYLON.Texture.TRILINEAR_SAMPLINGMODE);
        winParticlesLeft.spriteRandomStartCell = true
        winParticlesLeft.startSpriteCellID = 0;
        winParticlesLeft.endSpriteCellID = 4;
        winParticlesLeft.spriteCellHeight = 512;
        winParticlesLeft.spriteCellWidth = 512;
        winParticlesLeft.spriteCellLoop = true;
        winParticlesLeft.spriteCellChangeSpeed = 0;
        
    // Particles
    winParticlesLeft.minAngularSpeed = -2;
    winParticlesLeft.maxAngularSpeed = 2;
    winParticlesLeft.minSize = 0.1;
    winParticlesLeft.maxSize = 0.7;
    winParticlesLeft.minLifeTime = 0.2;
    winParticlesLeft.maxLifeTime = 0.75;
    winParticlesLeft.minEmitPower = 0.5;
    winParticlesLeft.maxEmitPower = 1.0;
    winParticlesLeft.emitter = emitterWin;
    winParticlesLeft.emitRate = 10;
    winParticlesLeft.blendMode = BABYLON.ParticleSystem.BLENDMODE_MULTIPLYADD;
    winParticlesLeft.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    winParticlesLeft.maxEmitBox = new BABYLON.Vector3(0, 0, 0);
    winParticlesLeft.direction1 = new BABYLON.Vector3(-1, 1, 0);
    winParticlesLeft.direction2 = new BABYLON.Vector3(-0.8, 0.8, 0);
    //particleSystem.color2 = new BABYLON.Color3(218/255, 165/255, 32/255); //hard gold
    winParticlesLeft.gravity = new BABYLON.Vector3(0, -1, 0);
    //velocity at birth
    //winParticles.addVelocityGradient(-1, 1, 0);
    //velocity reached at dead
    //winParticles.addVelocityGradient(-0.3,0, 0);

    winParticlesRight = new BABYLON.ParticleSystem("rain", 20, scene, null, true);
    winParticlesRight.particleTexture = new BABYLON.Texture("/assets/spriteswin.png", scene, true,
        false, BABYLON.Texture.TRILINEAR_SAMPLINGMODE);
        winParticlesRight.spriteRandomStartCell = true
        winParticlesRight.startSpriteCellID = 0;
        winParticlesRight.endSpriteCellID = 4;
        winParticlesRight.spriteCellHeight = 512;
        winParticlesRight.spriteCellWidth = 512;
        winParticlesRight.spriteCellLoop = true;
        winParticlesRight.spriteCellChangeSpeed = 0;
        
    // Particles
    winParticlesRight.minAngularSpeed = -2;
    winParticlesRight.maxAngularSpeed = 2;
    winParticlesRight.minSize = 0.1;
    winParticlesRight.maxSize = 0.7;
    winParticlesRight.minLifeTime = 0.2;
    winParticlesRight.maxLifeTime = 0.75;
    winParticlesRight.minEmitPower = 0.5;
    winParticlesRight.maxEmitPower = 1.0;
    winParticlesRight.emitter = emitterWin;
    winParticlesRight.emitRate = 10;
    winParticlesRight.blendMode = BABYLON.ParticleSystem.BLENDMODE_MULTIPLYADD;
    winParticlesRight.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    winParticlesRight.maxEmitBox = new BABYLON.Vector3(0, 0, 0);
    winParticlesRight.direction1 = new BABYLON.Vector3(0.8, 0.8, 0);
    winParticlesRight.direction2 = new BABYLON.Vector3(1, 1, 0);
    //winParticlesRight.color2 = new BABYLON.Color3(218/255, 165/255, 32/255); //hard gold
    winParticlesRight.gravity = new BABYLON.Vector3(0, -1, 0);
}

var shadowGenerator, boden
function AddShadows() {
    boden = BABYLON.Mesh.CreatePlane('boden', 3, scene)
    boden.rotation.x = Math.PI / 2
    boden.position.y = 0.0
    boden.parent = moveScene_P
    boden.material = new BABYLON.ShadowOnlyMaterial('shadowMat', scene);
    //alert(boden.material)
    boden.material.shadowColor = new BABYLON.Color3(50 / 255, 50 / 255, 50 / 255);
    boden.receiveShadows = true
    boden.visibility = 0.3


    shadowGenerator = new BABYLON.ShadowGenerator(2048, light)
    shadowGenerator.useBlurExponentialShadowMap = true;
    
    for (var l = 0; l < scene.meshes.length; l++) {
        if (scene.meshes[l].name == "hase_Untitled") {
            shadowGenerator.getShadowMap().renderList.push(scene.meshes[l])
        }
    }

}