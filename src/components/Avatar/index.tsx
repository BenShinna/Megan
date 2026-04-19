---
interface Props {
  frontSrc: string;
  backSrc: string;
  alt?: string;
  size?: number;
}

const { frontSrc, backSrc, alt = '头像', size = 56 } = Astro.props;
---

<div 
  class="avatar-flip"
  style={`width: ${size}px; height: ${size}px;`}
  data-avatar
>
  <div class="avatar-inner">
    <img src={frontSrc} alt={alt} class="avatar-front" draggable="false" />
    <img src={backSrc} alt={alt} class="avatar-back" draggable="false" />
  </div>
</div>

<style>
  .avatar-flip {
    perspective: 1000px;
    cursor: pointer;
    flex-shrink: 0;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    display: inline-block;
  }

  .avatar-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
  }

  .avatar-flip.flipped .avatar-inner,
  .avatar-flip:hover .avatar-inner {
    transform: rotateY(180deg);
  }

  .avatar-front,
  .avatar-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border: 2px solid white;
    background-color: var(--slate2, #f1f5f9);
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    outline: 1px solid var(--slate3, #e2e8f0);
  }

  .avatar-back {
    transform: rotateY(180deg);
  }
</style>

<script>
  document.querySelectorAll('[data-avatar]').forEach((avatar) => {
    avatar.addEventListener('click', () => {
      avatar.classList.toggle('flipped');
    });
  });
</script>
