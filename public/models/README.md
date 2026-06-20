# Robot Model

Drop your `.glb` robot file here, named exactly:

```
public/models/robot.glb
```

## Recommended free model (direct download, ready to use)

**Humanoid Robot Low Poly** — 2,552 triangles, ships with 2 built-in
animations (great for the idle/breathing effect), royalty-free.

Direct download:
https://www.get3dmodels.com/download/humanoid_robot_low_poly_by_get3dmodels.glb

Save the downloaded file into this folder and rename it to `robot.glb`.

## Higher-fidelity alternative

**Sci-Fi Humanoid Robot** by yur1_val (Sketchfab) — more detailed,
textured, closer to a Tesla-Bot / cinematic look. Requires a free
Sketchfab account to download.

https://sketchfab.com/3d-models/sci-fi-humanoid-robot-12ad786ecde246e5854a61fd4f67ed49

When exporting from Sketchfab, choose the **glTF (.glb)** format.

## If your model looks too big/small or off-center

Open `components/RobotScene.tsx` and adjust:

```tsx
<primitive object={scene} scale={1.4} />
```

and the group's `position={[0, -1.4, 0]}` until it's centered nicely
in the hero frame.

## If your model has different animation names

The code currently auto-plays `animations[0]` (the first clip found).
If your model has multiple clips (e.g. "Idle", "Wave", "Walk"), open
`RobotScene.tsx` and pick the right one by name:

```tsx
const idleClip = animations.find((a) => a.name === "Idle") ?? animations[0];
mixer.current.clipAction(idleClip).play();
```

## Performance note

Keep the model under ~80k triangles and textures at 2K (1K for
mobile) for smooth scroll performance on lower-end devices.
