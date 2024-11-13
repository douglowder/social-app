//
//  SheetViewController.swift
//  Pods
//
//  Created by Hailey on 9/30/24.
//

import Foundation
import UIKit

class SheetViewController: UIViewController {
  init() {
    super.init(nibName: nil, bundle: nil)

    self.isModalInPresentation = false

    #if os(iOS)
    if let sheet = self.sheetPresentationController {
      sheet.prefersGrabberVisible = false
    }
    #endif
  }

  func setDetents(contentHeight: CGFloat, preventExpansion: Bool) {
    #if os(iOS)
    guard let sheet = self.sheetPresentationController,
          let screenHeight = Util.getScreenHeight()
    else {
      return
    }

    if #available(iOS 16.0, *) {
      if contentHeight > screenHeight - 100 {
        sheet.detents = [
          .large()
        ]
        sheet.selectedDetentIdentifier = .large
      } else {
        sheet.detents = [
          .custom { _ in
            return contentHeight
          }
        ]
        if !preventExpansion {
          sheet.detents.append(.large())
        }
        sheet.selectedDetentIdentifier = .medium
      }
    } else {
      if contentHeight > screenHeight / 2 {
        sheet.detents = [
          .large()
        ]
        sheet.selectedDetentIdentifier = .large
      } else {
        sheet.detents = [
          .medium()
        ]
        if !preventExpansion {
          sheet.detents.append(.large())
        }
        sheet.selectedDetentIdentifier = .medium
      }
    }
    #endif
  }

  func updateDetents(contentHeight: CGFloat, preventExpansion: Bool) {
    #if os(iOS)
    if let sheet = self.sheetPresentationController {
      // Capture `self` weakly to prevent retain cycles.
      // Also, capture `sheet` weakly to avoid potential strong references held by animateChanges.
      sheet.animateChanges { [weak self, weak sheet] in
          guard let weakSelf = self, let weakSheet = sheet else { return }
          weakSelf.setDetents(contentHeight: contentHeight, preventExpansion: preventExpansion)
          if #available(iOS 16.0, *) {
              weakSheet.invalidateDetents()
          }
      }
    }
    #endif
  }

  #if os(iOS)
  func getCurrentDetentIdentifier() -> UISheetPresentationController.Detent.Identifier? {
    guard let sheet = self.sheetPresentationController else {
      return nil
    }
    return sheet.selectedDetentIdentifier
  }
  #endif

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}
