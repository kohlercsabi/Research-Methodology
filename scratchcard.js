const app = new PIXI.Application();
document.body.appendChild(app.view);
const { stage } = app;

const defaultIcon = "url('Img/euro.png'),auto";
app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;


const brush = new PIXI.Graphics();
brush.beginFill(0xffffff);
brush.drawCircle(0, 0, 20);
brush.endFill();


app.loader.add('original', 'Img/before.png');
app.loader.add('checked', 'Img/after.png');
app.loader.load(setup);

function setup(loader, resources) {
    const background = new PIXI.Sprite(resources.original.texture);
    stage.addChild(background);
    background.width = 245;
    background.height = 492;


    const imageToReveal = new PIXI.Sprite(resources.checked.texture);
    stage.addChild(imageToReveal);
    imageToReveal.width = 245;
    imageToReveal.height = 492;
    

    const renderTexture = PIXI.RenderTexture.create(app.screen.width, app.screen.height);

    const renderTextureSprite = new PIXI.Sprite(renderTexture);
    stage.addChild(renderTextureSprite);
    imageToReveal.mask = renderTextureSprite;

    app.stage.interactive = true;
    app.stage.on('pointerdown', pointerDown);
    app.stage.on('pointerup', pointerUp);
    app.stage.on('pointermove', pointerMove);

    let dragging = false;

    function pointerMove(event) {
        if (dragging) {
            brush.position.copyFrom(event.data.global);
            app.renderer.render(brush, renderTexture, false, null, false);
        }
    }
    function pointerDown(event) {
        dragging = true;
        pointerMove(event);
    }

    function pointerUp(event) {
        dragging = false;
    }
    
}