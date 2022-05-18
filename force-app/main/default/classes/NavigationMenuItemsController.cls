global with sharing class NavigationMenuItemsController {

    @AuraEnabled(cacheable=true)
    public static List<NavigationMenuItem> getNavigationMenuItems(String menuName, String publishedState) {
        System.assert(menuName != null);
        System.assert(publishedState != null);

        String networkId = Network.getNetworkId();
        System.assert(networkId != null);

        List<NavigationLinkSet> linkSets = [
            SELECT Id
            FROM NavigationLinkSet
            WHERE MasterLabel = :menuName AND NetworkId = :networkId
        ];

        System.assert(linkSets.size() == 1);
        Id linkSetId = linkSets.get(0).Id;

        return [SELECT toLabel(label), Target, Type, DefaultListViewId, AccessRestriction, ParentId, Position, Status, TargetPrefs
            FROM NavigationMenuItem
            WHERE NavigationLinkSetId = :linkSetId
            AND Status = :publishedState
            ORDER BY Position
        ];
    }
}