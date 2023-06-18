AFRAME.registerComponent("create-markers", {

  //Add Code Here!
  init: async function () {

    var mainScene = document.querySelector("#main-scene");

    // get the dishes collection from firestore database

    var dishes = await this.getDishes();

    dishes.map(dish => {
      var marker = document.createElement("a-marker");
      marker.setAttribute("id", dish.id);
      marker.setAttribute("type", "pattern");
      marker.setAttribute("url", dish.marker_pattern_url);
      marker.setAttribute("cursor", {
        rayOrigin: "mouse"
      });

      // set the markerhandler component

      marker.setAttribute("markerHandler", {});
      mainScene.appendChild(marker);

      // Adding 3D model to scene

      var model = document.createElement("a-entity");
      model.setAttribute("id", `model-${dish.id}`);
      model.setAttribute("position", dish.model_geometry.position);
      model.setAttribute("rotation", dish.model_geometry.rotation);
      model.setAttribute("scale", dish.model_geometry.scale);
      model.setAttribute("gltf-model", `url(${dish.model_url})`);
      model.setAttribute("gesture-handler", {});
      marker.appendChild(model);



      // Ingredients COntainer
      var mainPlane = document.createElement("a-plane");
      mainPlane.setAttribute("id", `main-plane-${dish.id}`);
      mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
      mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
      mainPlane.setAttribute("width", { dish.id });
      mainPlane.setAttribute("height", { dish.id });

    });
  },
});
