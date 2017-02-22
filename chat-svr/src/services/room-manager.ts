/**
 * ルーム管理クラスのモジュール。
 * @module ./services/room-manager
 */
import { EventEmitter } from 'events';
import { WebSocketRpcConnection } from '../core/ws/ws-rpc-connection';
import { Room } from './room';

/**
 * ルーム管理クラス。
 */
export class RoomManager extends EventEmitter {
	/** ルームマップ。 */
	protected rooms = new Map<number, Room>();

	/**
	 * ルームを新規作成する。
	 * @param name ルーム名。
	 * @return 作成したルーム。
	 */
	createRoom(name: string): Room {
		// ※ IDは現状、ルームの数+1
		const room = new Room(this.rooms.size + 1, name);
		this.rooms.set(room.id, room);
		// イベントを伝播させる
		room.on('notifyMessage', (params, connectionIds) => this.emit('notifyMessage', params, connectionIds));
		room.on('notifyRoomStatus', (params, connectionIds) => this.emit('notifyRoomStatus', params, connectionIds));
		return room;
	}

	/**
	 * 全ルーム一覧を取得する。
	 * @returns ルーム一覧。
	 */
	getRooms(): Room[] {
		return Array.from(this.rooms.values());
	}

	/**
	 * 指定されたルームを取得する。
	 * @param id ルームID。
	 * @returns ルーム情報。
	 */
	getRoom(id: number): Room {
		return this.rooms.get(id);
	}

	// イベント定義
	on(event: 'notifyMessage', listener: (params: any, connectionIds: string[]) => void): this;
	on(event: 'notifyRoomStatus', listener: (params: any, connectionIds: string[]) => void): this;
	on(event: string | symbol, listener: Function): this {
		return super.on(event, listener);
	}
}

// シングルトンなのでインスタンスを公開する
export default new RoomManager();