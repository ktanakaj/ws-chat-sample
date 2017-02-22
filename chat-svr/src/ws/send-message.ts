/**
 * メッセージ送信メソッドのモジュール。
 * @module ./ws/send-message
 */
import { AppError } from '../core/app-error';
import validationUtils from '../core/utils/validation-utils';
import { WebSocketRpcConnectionWithMap } from '../core/ws/ws-connection-map';
import { Room } from '../services/room';
import { Message } from '../services/message';

/**
 * メッセージ送信クラス。
 */
module.exports = class {
	/** WebSocket/RPCコネクション */
	connection: WebSocketRpcConnectionWithMap;
	/** セッション情報 */
	session: { room?: Room };

	/**
	 * メッセージを送信する。
	 * @param メッセージ情報。
	 */
	invoke(params: { name: string, body: string }): void {
		// 未参加の場合はエラー
		if (!this.session.room) {
			throw new AppError();
		}
		// メッセージを作成して送信
		const msg = new Message();
		msg.name = validationUtils.notFound(params.name);
		msg.body = validationUtils.notFound(params.body);
		this.session.room.sendMessage(msg);
	}
}
