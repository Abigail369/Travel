/**
 * @description glb模型信息
 */
import {deg2rad} from "../utils";
import Config from "./index";

export const SPOT_MODELS = [//景点模型信息，顺序加载，采用列表
  {
    ref: 'model_bridge',
    url: Config.apiPrefix + "/admin/images/bridge.glb",
    isShowOnLoad: true,
    scale: 700,
    position: [
      118.04029601 * deg2rad,
      35.46734033 * deg2rad,
      0],
    rotation: [
      -10.5 * deg2rad,
      0,
      0],
  },
  {
    ref: 'model_wanghailou',
    url: Config.apiPrefix + "/admin/images/wanghailou.glb",
    isShowOnLoad: true,
    scale: 70,
    position: [
      118.04883389 * deg2rad,
      35.47490196 * deg2rad,
      0],
    rotation: [
      0,
      0,
      0],
  },

]

export const SIM_MODELS = {//模拟用模型信息，选择性多次加载，故采用对象结构
  vehicle: {
    url: Config.apiPrefix + "/admin/images/vehicle.glb",
    isShowOnLoad: false,
    scale: 2,
    position: [//数组不能为空, 初始不展示的话随便选一个位置和旋转
      118.04883389 * deg2rad,
      35.47490196 * deg2rad,
      0],
    rotation: [
      0,
      0,
      0]
  }
}
