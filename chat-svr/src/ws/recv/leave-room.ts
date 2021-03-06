/**
 * ルーム離脱メソッドのモジュール。
 * @module ./ws/recv/leave-room
 */
import { WebSocketRpcConnection } from '../../core/ws/ws-rpc-connection';
import { Room } from '../../services/room';

/**
 * ルーム離脱クラス。
 */
export default class {
	/** WebSocket/RPCコネクション */
	connection: WebSocketRpcConnection;
	/** セッション情報 */
	session: { room?: Room };

	/**
	 * ルームを離脱する。
	 */
	invoke(): void {
		// 未参加の場合は何もしない
		if (this.session.room) {
			this.session.room.leave(this.connection.id);
			this.session.room = null;
		}
	}
}
