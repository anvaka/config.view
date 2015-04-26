/**
 * Controls available settings for the gobal view settings (like node colors,
 * size, 3d/2d, etc.)
 *
 * @param {ngraph.pixel} renderer instance which is performing the rendering.
 * @param {dat.gui} gui instance which shows configuration interface
 */
module.exports = addGlobalViewSettings;

function addGlobalViewSettings(settings) {
  var gui = settings.gui();
  var renderer = settings.renderer();
  var folder = gui.addFolder('View Settings');

  var model = {
    nodeColor: [0xff, 0xff, 0xff],
    linkStartColor: [0x33, 0x33, 0x33],
    linkEndColor: [0x33, 0x33, 0x33],
    nodeSize: 15,
    is3d: true,
    stable: changeStable
  };

  var stableController = folder.add(model, 'stable').name('Pause Layout');
  folder.addColor(model, 'nodeColor').onChange(setNodeColor);
  folder.add(model, 'nodeSize', 0, 200).onChange(setNodeSize);
  folder.addColor(model, 'linkStartColor').onChange(setLinkColor);
  folder.addColor(model, 'linkEndColor').onChange(setLinkColor);
  folder.add(model, 'is3d').onChange(set3dMode);
  folder.open();

  // TODO: add gui.destroyed, so that we can release renderer events:
  // whenever user changes mode via API/keyboard, reflect it in our UI:
  renderer.on('modeChanged', updateMode);
  renderer.on('stable', updateStableUI);

  function changeStable() {
    renderer.stable(!renderer.stable());
    renderer.focus();
  }

  function updateStableUI() {
    var isStable = renderer.stable();
    stableController.name(isStable ? 'Resume Layout' : 'Pause Layout');
  }

  function updateMode(newMode) {
    model.is3d = newMode;
    gui.update();
  }

  function set3dMode() {
    renderer.is3d(model.is3d);
    renderer.focus();
  }

  function setNodeColor() {
    var graph = renderer.graph();
    graph.forEachNode(setCustomNodeColor);
    renderer.focus();

    function setCustomNodeColor(node) {
      renderer.nodeColor(node.id, model.nodeColor);
    }
  }

  function setNodeSize() {
    var graph = renderer.graph();
    graph.forEachNode(setCustomNodeSize);
    renderer.focus();

    function setCustomNodeSize(node) {
      renderer.nodeSize(node.id, model.nodeSize);
    }
  }

  function setLinkColor() {
    var graph = renderer.graph();
    graph.forEachLink(setCustomLinkUI);
    renderer.focus();
  }

  function setCustomLinkUI(link) {
    renderer.linkColor(link.id, model.linkStartColor, model.linkEndColor);
  }
}
