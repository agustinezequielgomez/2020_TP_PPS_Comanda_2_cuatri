import { Injectable } from '@angular/core';
import { ActionSheetController, AnimationBuilder, LoadingController, ModalController, PickerController, PopoverController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ComponentCreatorService {

  constructor(private actionSheetController: ActionSheetController, private pickerController: PickerController,
    private popOverController: PopoverController, private loadingController: LoadingController,
    private modal: ModalController) { }

  async createActionSheet(buttons: [{
    text: string, handler: () => boolean | void | Promise<boolean | void>,
    icon?: string, role?: string
  }],
    mode: 'ios' | 'md', header: string, keyboardClose?: boolean, cssClass?: string,
    translucent?: boolean, subHeader?: string) {
    const ACTION_SHEET = await this.actionSheetController.create({
      animated: true,
      backdropDismiss: true,
      buttons: buttons,
      mode: mode,
      header: header,
      keyboardClose: keyboardClose,
      translucent: translucent,
      subHeader: subHeader,
      cssClass: cssClass
    });

    await ACTION_SHEET.present();
  }

  async createColumnPicker<T>(confirmHandler: (value: T) => boolean | void, columnObjects: T[], columnName: string,
    propDisplayName: string, mode: 'ios' | 'md', keyboardClose?: boolean, cssClass?: string) {
    const PICKER = await this.pickerController.create({
      animated: true,
      backdropDismiss: true,
      showBackdrop: true,
      keyboardClose: keyboardClose,
      cssClass: cssClass,
      mode: mode,
      buttons: [
        {
          text: 'Aceptar',
          handler: (value) => {
            confirmHandler(value[columnName].value);
          }
        },
        {
          text: 'Cancelar',
          role: 'Close'
        }
      ],
      columns: [
        {
          name: columnName,
          options: this.getSingleColumnOptions<T>(columnObjects, propDisplayName)
        }
      ]
    });

    await PICKER.present();
  }

  async createPopOver<T>(component: any, mode: 'ios' | 'md',
    keyboardClose?: boolean, cssClass?: string, translucent?: boolean): Promise<T> {
    const POPOVER = await this.popOverController.create({
      animated: true,
      backdropDismiss: true,
      component: component,
      cssClass: cssClass,
      keyboardClose: keyboardClose,
      mode: mode,
      showBackdrop: true,
      translucent: translucent
    });

    await POPOVER.present();
    const { data } = await POPOVER.onWillDismiss<T>();
    return data;
  }

  async createLoader(mode: 'ios' | 'md', message: string, keyboardClose: boolean, showBackDrop: boolean,
    spinner: 'bubbles' | 'circles' | 'circular' | 'crescent' | 'dots' | 'lines' | 'lines-small' | null | undefined,
    backdropDismiss = false, cssClass?: string): Promise<HTMLIonLoadingElement> {
    const LOADER = await this.loadingController.create({
      animated: true,
      backdropDismiss: backdropDismiss,
      cssClass: cssClass,
      keyboardClose: keyboardClose,
      message: message,
      mode: mode,
      showBackdrop: showBackDrop,
      spinner: spinner
    });

    await LOADER.present();
    return LOADER;
  }

  async createModal<T>(mode: 'ios' | 'md', component: any, componentData: undefined | { [key: string]: any },
    keyboardClose: boolean, backdropDismiss: boolean, cssClass?: string,
    animations?: { enter?: AnimationBuilder, leave?: AnimationBuilder }): Promise<T> {
    const MODAL = await this.modal.create({
      animated: true,
      backdropDismiss: backdropDismiss,
      component: component,
      componentProps: componentData,
      cssClass: cssClass,
      keyboardClose: keyboardClose,
      mode: mode,
      showBackdrop: true,
      // TODO: FIX
      // enterAnimation: animations.enter,
      // leaveAnimation: animations.leave
    });
    await MODAL.present();
    const { data } = await MODAL.onWillDismiss<T>();
    return data;
  }

  private getSingleColumnOptions<T>(objects: T[], displayProperty: string) {
    const OPTIONS: { text: string, value: T }[] = [];
    for (const column of objects) {
      OPTIONS.push({
        text: column[displayProperty],
        value: column
      });
    }
    return OPTIONS;
  }
}
