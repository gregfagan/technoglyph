import { look, take, go, nothing, start } from 'fbs'
import sectorIdx from './sector-idx'
import locationName from './location'
import buffer from './buffer'
import logger from './logger'
import inventory from './inventory'
import use from './use'
import inputEvent from './input-event'

export default [/*logger,*/sectorIdx, locationName, buffer, start, nothing, inventory, inputEvent, use, go, take, look]
