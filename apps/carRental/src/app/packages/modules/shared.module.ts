import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//prime modules
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BlockUIModule } from 'primeng/blockui';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DeferModule } from 'primeng/defer';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FocusTrapModule } from 'primeng/focustrap';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

//ngx
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports: [
      TranslateModule,
      ButtonModule,
      OverlayPanelModule,
      InputTextModule,
      InputTextareaModule,
      DropdownModule,
      FormsModule,
      DropdownModule,
      PanelModule,
      AccordionModule,
      GalleriaModule,
      TabViewModule,
      PasswordModule,
      CheckboxModule,
      ConfirmDialogModule,
      KnobModule,
      SelectButtonModule,
      ButtonModule,
      SidebarModule,
      InputTextModule,
      InputTextareaModule,
      ProgressBarModule,
      ProgressSpinnerModule,
      TableModule,
      FileUploadModule,
      InputMaskModule,
      MenubarModule,
      SliderModule,
      TabMenuModule,
      DialogModule,
      TooltipModule,
      RadioButtonModule,
      MessagesModule,
      MessageModule,
      CarouselModule,
      CardModule,
      ScrollPanelModule,
      VirtualScrollerModule,
      LightboxModule,
      MultiSelectModule,
      CalendarModule,
      InputSwitchModule,
      ChipsModule,
      AutoCompleteModule,
      ListboxModule,
      RatingModule,
      ToggleButtonModule,
      TriStateCheckboxModule,
      SplitButtonModule,
      ContextMenuModule,
      ToastModule,
      TreeModule,
      MenuModule,
      SplitterModule,
      OverlayPanelModule,
      DragDropModule,
      SkeletonModule,
      InputNumberModule,
      DividerModule,
      DataViewModule,
      FieldsetModule,
      ToolbarModule,
      ConfirmPopupModule,
      BreadcrumbModule,
      MegaMenuModule,
      PanelMenuModule,
      SlideMenuModule,
      StepsModule,
      TieredMenuModule,
      ImageModule,
      AvatarModule,
      AvatarGroupModule,
      BadgeModule,
      BlockUIModule,
      ChipModule,
      InplaceModule,
      ScrollTopModule,
      TagModule,
      DeferModule,
      FocusTrapModule,
      StyleClassModule,
      RippleModule,
      OrderListModule,
      PaginatorModule,
      PickListModule,
      TimelineModule,
      TreeSelectModule,
    ],
    declarations: [],
    exports: [
        TranslateModule,
        ButtonModule,
        OverlayPanelModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        FormsModule,
        DropdownModule,
        PanelModule,
        AccordionModule,
        GalleriaModule,
        TabViewModule,
        PasswordModule,
        CheckboxModule,
        ConfirmDialogModule,
        KnobModule,
        SelectButtonModule,
        ButtonModule,
        SidebarModule,
        InputTextModule,
        InputTextareaModule,
        ProgressBarModule,
        ProgressSpinnerModule,
        TableModule,
        FileUploadModule,
        InputMaskModule,
        MenubarModule,
        SliderModule,
        TabMenuModule,
        DialogModule,
        TooltipModule,
        RadioButtonModule,
        MessagesModule,
        MessageModule,
        CarouselModule,
        CardModule,
        ScrollPanelModule,
        VirtualScrollerModule,
        LightboxModule,
        MultiSelectModule,
        CalendarModule,
        InputSwitchModule,
        ChipsModule,
        AutoCompleteModule,
        ListboxModule,
        RatingModule,
        ToggleButtonModule,
        TriStateCheckboxModule,
        SplitButtonModule,
        ContextMenuModule,
        ToastModule,
        TreeModule,
        MenuModule,
        SplitterModule,
        OverlayPanelModule,
        DragDropModule,
        SkeletonModule,
        InputNumberModule,
        DividerModule,
        DataViewModule,
        FieldsetModule,
        ToolbarModule,
        ConfirmPopupModule,
        BreadcrumbModule,
        MegaMenuModule,
        PanelMenuModule,
        SlideMenuModule,
        StepsModule,
        TieredMenuModule,
        ImageModule,
        AvatarModule,
        AvatarGroupModule,
        BadgeModule,
        BlockUIModule,
        ChipModule,
        InplaceModule,
        ScrollTopModule,
        TagModule,
        DeferModule,
        FocusTrapModule,
        StyleClassModule,
        RippleModule,
        OrderListModule,
        PaginatorModule,
        PickListModule,
        TimelineModule,
        TreeSelectModule,
    ],
    providers: [
      MessageService,
      ConfirmationService
    ]
})
export class SharedModule { }