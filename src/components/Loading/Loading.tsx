import css from './Loading.module.css';

export default function Loading () {
  return(
    <div className={css.loading}>
      <div className={css.loop + ' ' + css.cubes}>
        <div className={css.item + ' ' + css.cubes}></div>
        <div className={css.item + ' ' + css.cubes}></div>
        <div className={css.item + ' ' + css.cubes}></div>
        <div className={css.item + ' ' + css.cubes}></div>
        <div className={css.item + ' ' + css.cubes}></div>
        <div className={css.item + ' ' + css.cubes}></div>
      </div>
    </div>
  );
}