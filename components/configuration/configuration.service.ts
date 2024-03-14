import { Injectable } from '@angular/core';
import { transform } from 'lodash-es';
import { Device } from './device.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DeviceStepperComponent } from './device-stepper.component';
import { InventoryService, QueriesUtil } from '@c8y/client';
import { Column, Pagination } from '@c8y/ngx-components';
/**
 * With the help of this service you can add or remove devices.
 */
@Injectable()
export class ConfigurationService {
  protected queriesUtil: QueriesUtil;
  private devices: Device[];

  constructor(private modalService: BsModalService,
    protected inventoryService: InventoryService) {
    this.devices = [];
    this.queriesUtil = new QueriesUtil();
  }

  findDevice(imei: string) {
    console.log(imei, 888);
    
    const filters = this.getFilters(this.getColumns(imei));
    return new Promise(resolve => {
      this.inventoryService.list(filters);
      resolve(true);
    });
  }

  addDevice(device: Device) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.devices.push(device);
        resolve(true);
      }, 2000);
    });
  }

  modalCreateDevice() {
    this.modalService.show(DeviceStepperComponent, {
      class: 'modal-lg',
      ariaDescribedby: 'modal-body',
      ariaLabelledBy: 'modal-title'
    });
  }

  getColumns(imei: string): Column[] {
    const columns = [
      {
        name: 'c8y_Hardware.serialNumber',
        header: 'IMEI',
        path: 'imei',
        filterPredicate: imei,
        filterable: true,
        sortable: true
      },
      {
        name: 'type',
        header: 'IMEI',
        path: 'type',
        filterable: true,
        sortable: true,
        externalFilterQuery: {
          model: {
            application: true
          },
          query: {
              __and: [
                  {
                      type: "c8y_lwm2m"
                  }
              ]
          }
        },
      }
    ];

    return columns;
  }

  // /** Returns initial pagination object. */
  // getPagination(): Pagination {
  //   return {
  //     pageSize: 10,
  //     currentPage: 1
  //   };
  // }

  /** Returns filters for given columns and pagination setup. */
  private getFilters(columns: Column[]) {
    return {
      query: this.getQueryString(columns),
      pageSize: 1,
      withParents: true,
      withTotalPages: true
    };
  }

  /** Returns a query string based on columns setup. */
  private getQueryString(columns: Column[]): string {
    const fullQuery = this.getQueryObj(columns);
    return this.queriesUtil.buildQuery(fullQuery);
  }

  private getQueryObj(columns: Column[]): any {
    return transform(columns, (query, column) => this.addColumnQuery(query, column), {
      __filter: {},
      __orderby: []
    });
  }

  private addColumnQuery(query: any, column: Column): void {
    // when a column is marked as filterable
    if (column.filterable) {
      // in the case of default filtering form, `filterPredicate` will contain the string entered by a user
      if (column.filterPredicate) {
        // so we use it as the expected value, * allow to search for it anywhere in the property
        query.__filter[column.path] = `*${column.filterPredicate}*`;
      }

      // in the case of custom filtering form, we're storing the query in `externalFilterQuery.query`
      if (column.externalFilterQuery) {
        query = this.queriesUtil.addAndFilter(query, column.externalFilterQuery.query);
      }
    }

    // when a column is sortable and has a specified sorting order
    if (column.sortable && column.sortOrder) {
      // add sorting condition for the configured column `path`
      query.__orderby.push({
        [column.path]: column.sortOrder === 'asc' ? 1 : -1
      });
    }

    return query;
  }
}
