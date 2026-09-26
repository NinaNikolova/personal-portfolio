import { useEffect, useRef } from "react";
import { Application, Container, Graphics, Sprite } from "pixi.js";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Soft glowing dot, drawn once and shared by every sprite
const createGlowTexture = (renderer) => {
  const g = new Graphics();
  for (let i = 0; i < 6; i++) {
    g.circle(16, 16, 16 - i * 2.4).fill({ color: 0xffffff, alpha: 0.05 + i * 0.03 });
  }
  g.circle(16, 16, 3).fill({ color: 0xffffff, alpha: 1 });
  const texture = renderer.generateTexture(g);
  g.destroy();
  return texture;
};

/* ---------- Dark theme: star constellation ---------- */

const STAR_COLORS = [0xAA367C, 0x4A2FBD, 0xffffff];
const STAR_LINE = 0xb58cff;
const LINK_DISTANCE = 130;
const CURSOR_RADIUS = 180;
const REPEL_RADIUS = 120;
const BURST_RADIUS = 220;

const createStarScene = ({ app, root, texture, pointer, reducedMotion }) => {
  const links = new Graphics();
  const nodeLayer = new Container();
  const sparkLayer = new Container();
  root.addChild(links, nodeLayer, sparkLayer);

  const { width, height } = app.screen;
  const count = Math.max(40, Math.min(120, Math.floor((width * height) / 11000)));

  const nodes = Array.from({ length: count }, () => {
    const sprite = new Sprite(texture);
    sprite.anchor.set(0.5);
    sprite.scale.set(0.35 + Math.random() * 0.55);
    sprite.position.set(Math.random() * width, Math.random() * height);
    sprite.tint = pick(STAR_COLORS);
    nodeLayer.addChild(sprite);
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.15 + Math.random() * 0.35;
    return {
      sprite,
      driftX: Math.cos(angle) * speed,
      driftY: Math.sin(angle) * speed,
      pushX: 0,
      pushY: 0,
      phase: Math.random() * Math.PI * 2,
      baseAlpha: 0.55 + Math.random() * 0.45,
    };
  });

  let sparks = [];
  let time = 0;

  const onPointerDown = (x, y) => {
    for (let i = 0; i < 28; i++) {
      const sprite = new Sprite(texture);
      sprite.anchor.set(0.5);
      sprite.position.set(x, y);
      sprite.tint = pick(STAR_COLORS);
      sparkLayer.addChild(sprite);
      const angle = (i / 28) * Math.PI * 2 + Math.random() * 0.3;
      const speed = 2 + Math.random() * 5;
      sparks.push({ sprite, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1 });
    }
    // Shockwave: fling nearby nodes outward
    nodes.forEach((n) => {
      const dx = n.sprite.x - x;
      const dy = n.sprite.y - y;
      const d = Math.hypot(dx, dy) || 1;
      if (d < BURST_RADIUS) {
        const force = (1 - d / BURST_RADIUS) * 9;
        n.pushX += (dx / d) * force;
        n.pushY += (dy / d) * force;
      }
    });
  };

  const update = (dt) => {
    const w = app.screen.width;
    const h = app.screen.height;
    time += 0.02 * dt;

    for (const n of nodes) {
      const s = n.sprite;
      if (pointer.active && !reducedMotion) {
        const dx = s.x - pointer.x;
        const dy = s.y - pointer.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < REPEL_RADIUS) {
          const force = (1 - d / REPEL_RADIUS) * 0.6;
          n.pushX += (dx / d) * force;
          n.pushY += (dy / d) * force;
        }
      }
      s.x += (n.driftX + n.pushX) * dt;
      s.y += (n.driftY + n.pushY) * dt;
      n.pushX *= 0.93;
      n.pushY *= 0.93;

      // Wrap around the edges with a small margin
      if (s.x < -20) s.x = w + 20;
      else if (s.x > w + 20) s.x = -20;
      if (s.y < -20) s.y = h + 20;
      else if (s.y > h + 20) s.y = -20;

      s.alpha = n.baseAlpha * (0.75 + 0.25 * Math.sin(time + n.phase));
    }

    links.clear();
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i].sprite;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j].sprite;
        const dx = a.x - b.x;
        if (dx > LINK_DISTANCE || dx < -LINK_DISTANCE) continue;
        const d = Math.hypot(dx, a.y - b.y);
        if (d < LINK_DISTANCE) {
          links.moveTo(a.x, a.y).lineTo(b.x, b.y)
            .stroke({ width: 1, color: STAR_LINE, alpha: (1 - d / LINK_DISTANCE) * 0.35 });
        }
      }
      if (pointer.active) {
        const d = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (d < CURSOR_RADIUS) {
          links.moveTo(pointer.x, pointer.y).lineTo(a.x, a.y)
            .stroke({ width: 1.2, color: STAR_LINE, alpha: (1 - d / CURSOR_RADIUS) * 0.6 });
        }
      }
    }

    sparks = sparks.filter((p) => {
      p.life -= 0.025 * dt;
      if (p.life <= 0) {
        p.sprite.destroy();
        return false;
      }
      p.vx *= 0.95;
      p.vy = p.vy * 0.95 + 0.05 * dt;
      p.sprite.x += p.vx * dt;
      p.sprite.y += p.vy * dt;
      p.sprite.alpha = p.life;
      p.sprite.scale.set(0.3 + p.life * 0.5);
      return true;
    });
  };

  return { update, onPointerDown };
};

/* ---------- Light theme: sea waves and birds ---------- */

// Back to front: distant pale swells to the deep teal foreground
const WAVE_LAYERS = [
  { top: 0.80, amp: 6, len: 260, speed: 0.012, color: 0xffffff, alpha: 0.18 },
  { top: 0.85, amp: 8, len: 320, speed: -0.016, color: 0x9fe3f5, alpha: 0.28 },
  { top: 0.90, amp: 11, len: 380, speed: 0.02, color: 0x2fabce, alpha: 0.38 },
  { top: 0.95, amp: 14, len: 440, speed: -0.024, color: 0x0f8b8c, alpha: 0.5 },
];
const BIRD_COLOR = 0x0e3a4a;
const BOAT_OUTLINE = 0x4f9fb8;
const SCARE_RADIUS = 140;
const SCATTER_RADIUS = 260;

const drawBird = (g, size, flap) => {
  // Gull silhouette: two curved wings meeting at the body, tips follow the flap
  const tipY = -flap * size * 0.55;
  const ctrlY = -size * 0.45 + flap * size * 0.2;
  g.clear()
    .moveTo(-size, tipY)
    .quadraticCurveTo(-size * 0.45, ctrlY, 0, 0)
    .quadraticCurveTo(size * 0.45, ctrlY, size, tipY)
    .stroke({ width: Math.max(1.5, size * 0.16), color: BIRD_COLOR, cap: "round", join: "round" });
};

const drawBoat = (g) => {
  // Drawn facing right with the deck at y=0; the scene flips and tilts it
  const outline = { width: 1.5, color: BOAT_OUTLINE, alpha: 0.55, join: "round" };
  g.moveTo(-5, 0).lineTo(-5, -74).stroke({ width: 3, color: 0xffffff, cap: "round" });
  g.poly([-2, -70, -2, -6, 38, -6]).fill(0xffffff).stroke(outline);
  g.poly([-8, -60, -8, -6, -34, -6]).fill(0xf4fbfd).stroke(outline);
  g.poly([-46, -2, 46, -2, 34, 14, -36, 14]).fill(0xffffff).stroke(outline);
};

// Which wave each boat rides and how big it is; smaller boats sit farther back
const BOATS = [
  { layer: 1, size: 0.55 },
  { layer: 1, size: 0.75 },
  { layer: 2, size: 1 },
];

const createSeaScene = ({ app, root, texture, pointer, reducedMotion }) => {
  // Each wave gets a container above it so boats sit between wave layers
  const waves = WAVE_LAYERS.map((layer) => {
    const g = new Graphics();
    const above = new Container();
    root.addChild(g, above);
    return { ...layer, g, above, offset: Math.random() * 1000 };
  });
  const foam = new Graphics();
  const birdLayer = new Container();
  const splashLayer = new Container();
  root.addChild(foam, splashLayer, birdLayer);

  const { width, height } = app.screen;
  const birdCount = Math.max(6, Math.min(16, Math.floor(width / 110)));

  const birds = Array.from({ length: birdCount }, () => {
    const g = new Graphics();
    birdLayer.addChild(g);
    const size = 6 + Math.random() * 9;
    g.position.set(Math.random() * width, height * (0.08 + Math.random() * 0.5));
    g.alpha = 0.45 + (size / 15) * 0.5; // smaller birds read as farther away
    return {
      g,
      size,
      vx: (0.4 + Math.random() * 0.6) * (size / 10),
      vy: 0,
      pushX: 0,
      pushY: 0,
      phase: Math.random() * Math.PI * 2,
      flapSpeed: 0.12 + Math.random() * 0.06,
      panic: 0,
      bob: Math.random() * Math.PI * 2,
    };
  });

  const boatScale = Math.max(0.6, Math.min(1, width / 1400));
  const boats = BOATS.map(({ layer, size }) => {
    const g = new Graphics();
    drawBoat(g);
    waves[layer].above.addChild(g);
    const dir = Math.random() < 0.5 ? -1 : 1;
    return {
      g,
      layer,
      size: size * boatScale,
      x: width * (0.55 + Math.random() * 0.4),
      dir,
      facing: dir,
      speed: 0.2 + Math.random() * 0.25,
      pushX: 0,
    };
  });

  let ripples = [];
  let droplets = [];
  let time = 0;

  const waveY = (layer, x, h) => {
    const base = h * layer.top;
    const k = (Math.PI * 2) / layer.len;
    let y = base
      + Math.sin(x * k + time * layer.speed * 60 + layer.offset) * layer.amp
      + Math.sin(x * k * 2.3 - time * layer.speed * 40 + layer.offset) * layer.amp * 0.35;

    // The cursor lifts the water beneath it like a gust
    if (pointer.active && !reducedMotion && pointer.y > base - 160) {
      const dx = (x - pointer.x) / 90;
      y -= Math.exp(-dx * dx) * 14 * (layer.amp / 16);
    }
    for (const r of ripples) {
      const d = Math.abs(x - r.x);
      const front = r.age * 4;
      if (d < front) {
        y += Math.sin((d - front) * 0.08) * 12 * r.strength * Math.exp(-d / 220) * (layer.amp / 16);
      }
    }
    return y;
  };

  const onPointerDown = (x, y) => {
    const h = app.screen.height;
    const seaTop = h * WAVE_LAYERS[0].top - 20;

    if (y > seaTop) {
      ripples.push({ x, age: 0, strength: 1 });
      for (let i = 0; i < 22; i++) {
        const sprite = new Sprite(texture);
        sprite.anchor.set(0.5);
        sprite.position.set(x, y);
        sprite.tint = pick([0xffffff, 0xdff6fd, 0x9fe3f5]);
        splashLayer.addChild(sprite);
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
        const speed = 3 + Math.random() * 5;
        droplets.push({ sprite, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1 });
      }
    }

    boats.forEach((b) => {
      const dx = b.x - x;
      if (Math.abs(dx) < 160 && y > seaTop) b.pushX += Math.sign(dx || 1) * (1 - Math.abs(dx) / 160) * 3;
    });

    // Anything nearby takes off in a hurry
    birds.forEach((b) => {
      const dx = b.g.x - x;
      const dy = b.g.y - y;
      const d = Math.hypot(dx, dy) || 1;
      if (d < SCATTER_RADIUS) {
        const force = (1 - d / SCATTER_RADIUS) * 8;
        b.pushX += (dx / d) * force;
        b.pushY += (dy / d) * force - 2;
        b.panic = 1;
      }
    });
  };

  const update = (dt) => {
    const w = app.screen.width;
    const h = app.screen.height;
    time += 0.02 * dt;

    // Waves
    const step = 12;
    waves.forEach((layer, i) => {
      const g = layer.g;
      g.clear().moveTo(0, h);
      for (let x = 0; x <= w + step; x += step) g.lineTo(x, waveY(layer, x, h));
      g.lineTo(w, h).closePath().fill({ color: layer.color, alpha: layer.alpha });
    });

    // Foam line on the two front waves
    foam.clear();
    waves.slice(-2).forEach((layer) => {
      foam.moveTo(0, waveY(layer, 0, h));
      for (let x = step; x <= w + step; x += step) foam.lineTo(x, waveY(layer, x, h));
      foam.stroke({ width: 2, color: 0xffffff, alpha: 0.45 });
    });

    ripples = ripples.filter((r) => {
      r.age += dt;
      r.strength *= Math.pow(0.985, dt);
      return r.strength > 0.05;
    });

    // Boats sail back and forth on the open water right of the text,
    // riding (and tilting with) the wave they sit on
    const laneMin = w < 768 ? 60 : w * 0.55;
    const laneMax = w - 60;
    for (const b of boats) {
      b.x += (b.dir * b.speed + b.pushX) * dt;
      b.pushX *= Math.pow(0.95, dt);
      if (b.x > laneMax) b.dir = -1;
      else if (b.x < laneMin) b.dir = 1;
      // Ease through the turn instead of snapping to the new heading
      b.facing += (b.dir - b.facing) * Math.min(1, 0.03 * dt);

      const layer = waves[b.layer];
      const surface = waveY(layer, b.x, h);
      const slope = (waveY(layer, b.x + 14, h) - waveY(layer, b.x - 14, h)) / 28;
      b.g.position.set(b.x, surface - 10 * b.size);
      b.g.rotation = Math.atan(slope) * 0.9;
      b.g.scale.set(b.size * b.facing, b.size);
    }

    // Birds
    const skyBottom = h * WAVE_LAYERS[0].top - 40;
    for (const b of birds) {
      const g = b.g;
      if (pointer.active && !reducedMotion) {
        const dx = g.x - pointer.x;
        const dy = g.y - pointer.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < SCARE_RADIUS) {
          const force = (1 - d / SCARE_RADIUS) * 0.5;
          b.pushX += (dx / d) * force;
          b.pushY += (dy / d) * force;
          b.panic = Math.min(1, b.panic + 0.1);
        }
      }

      b.bob += 0.03 * dt;
      g.x += (b.vx + b.pushX) * dt;
      g.y += (Math.sin(b.bob) * 0.25 + b.pushY) * dt;
      b.pushX *= 0.95;
      b.pushY *= 0.95;
      b.panic *= Math.pow(0.97, dt);

      // Keep birds in the sky, drifting back if pushed toward the water
      if (g.y > skyBottom) b.pushY -= 0.15 * dt;
      if (g.y < 20) b.pushY += 0.1 * dt;

      if (g.x > w + 40) {
        g.x = -40;
        g.y = h * (0.08 + Math.random() * 0.5);
      } else if (g.x < -60) {
        g.x = w + 40;
      }

      // Flap faster when startled, otherwise flap-and-glide
      b.phase += (b.flapSpeed + b.panic * 0.35) * dt;
      const glide = b.panic > 0.2 ? 1 : Math.max(0, Math.sin(b.phase * 0.15));
      const flap = Math.sin(b.phase) * (0.35 + 0.65 * glide);
      drawBird(g, b.size, flap);
    }

    // Splash droplets fall back into the sea
    droplets = droplets.filter((p) => {
      p.life -= 0.02 * dt;
      if (p.life <= 0) {
        p.sprite.destroy();
        return false;
      }
      p.vy += 0.25 * dt;
      p.sprite.x += p.vx * dt;
      p.sprite.y += p.vy * dt;
      p.sprite.alpha = p.life;
      p.sprite.scale.set(0.25 + p.life * 0.35);
      return true;
    });
  };

  return { update, onPointerDown };
};

/* ---------- Pixi host ---------- */

const SCENES = { dark: createStarScene, light: createSeaScene };

export const ParticleField = ({ theme }) => {
  const hostRef = useRef(null);
  const themeRef = useRef(theme);
  const buildSceneRef = useRef(null);

  useEffect(() => {
    themeRef.current = theme;
    buildSceneRef.current?.();
  }, [theme]);

  useEffect(() => {
    const host = hostRef.current;
    const section = host.parentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const app = new Application();
    let destroyed = false;
    let teardown = () => {};

    (async () => {
      await app.init({
        backgroundAlpha: 0,
        antialias: true,
        resizeTo: host,
        autoDensity: true,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
      });
      // React StrictMode may unmount before init resolves
      if (destroyed) {
        app.destroy(true, { children: true, texture: true });
        return;
      }
      host.appendChild(app.canvas);

      const texture = createGlowTexture(app.renderer);
      const pointer = { x: 0, y: 0, active: false };
      let root = null;
      let scene = null;

      buildSceneRef.current = () => {
        root?.destroy({ children: true });
        root = new Container();
        app.stage.addChild(root);
        const create = SCENES[themeRef.current] || SCENES.dark;
        scene = create({ app, root, texture, pointer, reducedMotion });
      };
      buildSceneRef.current();

      const toLocal = (e) => {
        const rect = host.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top, rect };
      };

      const onPointerMove = (e) => {
        const { x, y, rect } = toLocal(e);
        pointer.x = x;
        pointer.y = y;
        pointer.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      };
      const onPointerLeave = () => { pointer.active = false; };
      const onPointerDown = (e) => {
        if (reducedMotion || e.target.closest("a, button")) return;
        const { x, y } = toLocal(e);
        scene.onPointerDown(x, y);
      };

      window.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerleave", onPointerLeave);
      section.addEventListener("pointerdown", onPointerDown);

      // Don't burn frames while the banner is scrolled out of view
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) app.ticker.start();
        else app.ticker.stop();
      });
      observer.observe(host);

      const motion = reducedMotion ? 0.15 : 1;
      app.ticker.add((ticker) => scene.update(ticker.deltaTime * motion));

      teardown = () => {
        observer.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerleave", onPointerLeave);
        section.removeEventListener("pointerdown", onPointerDown);
        buildSceneRef.current = null;
        app.destroy(true, { children: true });
        texture.destroy(true);
      };
    })();

    return () => {
      destroyed = true;
      teardown();
    };
  }, []);

  return <div ref={hostRef} className="banner-canvas" aria-hidden="true" />;
};
