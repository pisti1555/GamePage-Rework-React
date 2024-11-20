import css from './LobbyChat.module.css';

export default function LobbyChat() {
  return (
    <>
      <div className={css.chatContent}>
        <ul></ul>
      </div>
      <div className={css.chatSend}>
        <input type="text" placeholder="send a message..." />
        <button type="submit" onClick={() => {}}>send</button>
      </div>
    </>
  );
}